import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import api from "@/lib/api";
import { Zap, ArrowRight, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface TopUser {
  rank: number;
  email: string;
  totalTokens: number;
}

export default function HomePage() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/stats/top-users");
        setTopUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="absolute top-0 w-full z-10 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Zap className="h-5 w-5" />
          </div>
          <span>OpenAPI</span>
        </div>
        <div className="flex gap-4">
          {user ? (
            <Button onClick={() => navigate("/dashboard")}>
              Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/signup")}>Get Started</Button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center space-y-8 bg-gradient-to-b from-background via-background to-primary/5">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 animate-in fade-in zoom-in duration-1000">
            Unified AI API
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Access the best AI models with a single API key. Track usage, manage
            keys, and build faster.
          </p>
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              size="lg"
              className="h-12 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/signup")}
            >
              Start Building Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-lg"
              onClick={() => navigate("/docs")}
            >
              Read Documentation
            </Button>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Top Power Users
              </h2>
              <p className="text-muted-foreground">
                Recognizing the builders pushing the boundaries of AI.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Leaderboard via Token Usage</CardTitle>
                  <CardDescription>
                    Top 10 users by total input/output tokens consumed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topUsers.map((u, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              index === 0
                                ? "bg-yellow-500/20 text-yellow-500"
                                : index === 1
                                  ? "bg-zinc-400/20 text-zinc-400"
                                  : index === 2
                                    ? "bg-amber-700/20 text-amber-700"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {u.rank}
                          </div>
                          <div className="font-medium">
                            {u.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}{" "}
                            {/* Privacy masking */}
                          </div>
                        </div>
                        <div className="font-mono text-sm font-semibold text-primary">
                          {u.totalTokens.toLocaleString()} tokens
                        </div>
                      </div>
                    ))}
                    {topUsers.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Leaderboard updating...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © 2026 OpenAPI. Built with ❤️ for builders.
      </footer>
    </div>
  );
}
