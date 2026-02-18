import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Box } from "lucide-react";

interface Company {
  id: string;
  name: string;
  website: string;
}

interface Model {
  id: string;
  name: string;
  slug: string;
  company: Company;
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { data } = await api.get("/models");
        setModels(data.models);
      } catch (error) {
        console.error("Failed to fetch models", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Models</h1>
        <p className="text-muted-foreground mt-1">
          Explore available AI models and their providers
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <Card
            key={model.id}
            className="border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:border-primary/50"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Box className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg">{model.name}</CardTitle>
              <CardDescription className="font-mono text-xs">
                {model.slug}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium mr-1">Provider:</span>{" "}
                {model.company.name}
              </div>
            </CardContent>
          </Card>
        ))}

        {models.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No models found
          </div>
        )}
      </div>
    </div>
  );
}
