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
      <div className="text-center py-10 text-muted-foreground border rounded-md">
        No API keys found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
        <div className="col-span-4">Name</div>
        <div className="col-span-3">Usage (Credits)</div>
        <div className="col-span-3">Last Used</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>
      {keys.map((key) => (
        <div
          key={key.id}
          className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm"
        >
          <div className="col-span-4 font-medium">{key.name}</div>
          <div className="col-span-3">{key.creditsConsumed}</div>
          <div className="col-span-3">
            {key.lastUsed
              ? new Date(key.lastUsed).toLocaleDateString()
              : "Never"}
          </div>
          <div className="col-span-1">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                key.disabled
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {key.disabled ? "Disabled" : "Active"}
            </span>
          </div>
          <div className="col-span-1 text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                  className="text-red-600 focus:text-red-600"
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
