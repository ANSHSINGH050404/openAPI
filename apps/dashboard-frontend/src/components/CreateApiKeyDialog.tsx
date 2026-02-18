import { useState } from "react";
import { Copy, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";

interface CreateApiKeyDialogProps {
  onSuccess: () => void;
}

export function CreateApiKeyDialog({ onSuccess }: CreateApiKeyDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post("/apikey", { name });
      if (data.success) {
        setNewKey(data.apikey);
        toast.success("API Key created successfully");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create API key");
    } finally {
      setIsLoading(false);
    }
  };

  const handlCopy = () => {
    if (newKey) {
      navigator.clipboard.writeText(newKey);
      toast.success("Copied to clipboard");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewKey(null);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <Plus className="mr-2 h-4 w-4" /> Create New Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!newKey ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="pb-2">
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Enter a name for your new API key to track its usage.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Key Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Application"
                required
                className="bg-background/50"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Key
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                API Key Created
              </DialogTitle>
              <DialogDescription>
                Please copy your API key now. You won't be able to see it again!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg mt-2 break-all border border-border/50">
              <code className="text-sm flex-1 font-mono">{newKey}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlCopy}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
