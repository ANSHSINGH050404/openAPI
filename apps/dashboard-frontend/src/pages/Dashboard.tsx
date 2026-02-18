import { useEffect, useState } from "react";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { ApiKeyList } from "@/components/ApiKeyList";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <div className="flex items-center space-x-2"></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.credits ?? 0}</div>
            <p className="text-xs text-muted-foreground">Available for use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keys.filter((k: any) => !k.disabled).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Operational API keys
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
