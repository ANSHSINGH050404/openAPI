import { useEffect, useState } from "react";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { ApiKeyList } from "@/components/ApiKeyList";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchKeys = async () => {
    try {
      const { data } = await api.get("/apikey");
      if (data.success) {
        setKeys(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch keys", error);
    } finally {
      setLoading(false);
    }
  };

  const [isAddingCredits, setIsAddingCredits] = useState(false);
  const { user, refreshUser } = useAuth();

  const handleAddCredits = async () => {
    setIsAddingCredits(true);
    try {
      await api.post("/payments/onramp");
      await refreshUser();
      // toast.success("Credits added successfully"); // toast is not imported yet, adding locally or just relying on refresh
    } catch (error) {
      console.error("Failed to add credits", error);
    } finally {
      setIsAddingCredits(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your API keys and credits
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{user?.credits ?? 0}</div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddCredits}
                disabled={isAddingCredits}
              >
                {isAddingCredits ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-1" />
                )}
                Add Credits
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Available for API usage
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {keys.filter((k: any) => !k.disabled).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active API keys
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">API Keys</h2>
          <CreateApiKeyDialog onSuccess={fetchKeys} />
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ApiKeyList keys={keys} onRefresh={fetchKeys} />
        )}
      </div>
    </div>
  );
}
