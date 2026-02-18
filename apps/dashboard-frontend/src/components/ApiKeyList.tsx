import { useState } from "react";
import { MoreHorizontal, Trash, Power, PowerOff, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { toast } from "sonner";

interface ApiKey {
  id: number;
  name: string;
  creditsConsumed: number;
  lastUsed: string | null;
  disabled: boolean;
}

interface ApiKeyListProps {
  keys: ApiKey[];
  onRefresh: () => void;
}

export function ApiKeyList({ keys, onRefresh }: ApiKeyListProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const toggleStatus = async (key: ApiKey) => {
    setLoadingId(key.id);
    try {
      if (key.disabled) {
        await api.put("/apikey/enable", { id: key.id });
        toast.success("API Key enabled");
      } else {
        await api.put("/apikey", { id: key.id }); // Using PUT /apikey for disable as per router
        toast.success("API Key disabled");
      }
      onRefresh();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteKey = async (id: number) => {
    if (!confirm("Are you sure you want to delete this key?")) return;
    setLoadingId(id);
    try {
      await api.delete(`/apikey/${id}`);
      toast.success("API Key deleted");
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete key");
    } finally {
      setLoadingId(null);
    }
  };

  if (keys.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed rounded-xl text-muted-foreground bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <p className="font-medium">No API keys yet</p>
          <p className="text-sm">Create your first API key to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {keys.map((key) => (
        <div
          key={key.id}
          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                key.disabled ? "bg-muted" : "bg-primary/10"
              }`}
            >
              <svg
                className={`h-5 w-5 ${key.disabled ? "text-muted-foreground" : "text-primary"}`}
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
            <div>
              <p className="font-medium">{key.name}</p>
              <p className="text-sm text-muted-foreground">
                {key.creditsConsumed} credits used
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                key.disabled
                  ? "bg-red-500/10 text-red-500"
                  : "bg-green-500/10 text-green-500"
              }`}
            >
              {key.disabled ? "Disabled" : "Active"}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => toggleStatus(key)}
                  disabled={loadingId === key.id}
                >
                  {key.disabled ? (
                    <Power className="mr-2 h-4 w-4" />
                  ) : (
                    <PowerOff className="mr-2 h-4 w-4" />
                  )}
                  {key.disabled ? "Enable" : "Disable"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => deleteKey(key.id)}
                  disabled={loadingId === key.id}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
