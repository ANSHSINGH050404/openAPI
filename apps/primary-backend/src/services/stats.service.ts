import { prisma } from "db";

export class StatsService {
  static async getTopTokenUsers(limit: number = 10) {
    const apiKeys = await prisma.apiKey.groupBy({
      by: ["userId"],
      _sum: {
        totalTokens: true,
      },
      orderBy: {
        _sum: {
          totalTokens: "desc",
        },
      },
      take: limit,
    });

    // Since groupBy doesn't allow including relations directly efficiently in all prisma versions for this specific query structure
    // We will fetch user details separately.
    const userIds = apiKeys.map((k) => k.userId);

    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, email: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    return apiKeys.map((item, index) => {
      const user = userMap.get(item.userId);
      return {
        rank: index + 1,
        email: user?.email || "Unknown",
        totalTokens: item._sum.totalTokens || 0,
      };
    });
  }
}
