import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

export default function DocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const curlExample = `curl https://localhost:5001/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "google/gemini-2.5-flash",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  }'`;

  const jsExample = `import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://localhost:5001/api/v1',
  apiKey: 'YOUR_API_KEY',
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'google/gemini-2.5-flash',
  });

  console.log(completion.choices[0]);
}

main();`;

  const pythonExample = `from openai import OpenAI

client = OpenAI(
    base_url="https://localhost:5001/api/v1",
    api_key="YOUR_API_KEY",
)

completion = client.chat.completions.create(
  model="google/gemini-2.5-flash",
  messages=[
    {"role": "user", "content": "Say this is a test"}
  ]
)

print(completion.choices[0].message)`;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground mt-1">
          Learn how to integrate OpenRouter into your applications
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            OpenRouter provides an OpenAI-compatible API, making it easy to use
            with existing libraries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Base URL
            </h3>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50 font-mono text-sm">
              <span className="flex-1">https://localhost:5001/api/v1</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard("https://localhost:5001/api/v1")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Chat Completions</CardTitle>
          <CardDescription>
            Generate responses from various LLMs using a standardized API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="js">Node.js</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>

            <TabsContent value="curl">
              <div className="relative rounded-lg bg-muted border border-border/50 p-4 font-mono text-xs md:text-sm overflow-x-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => copyToClipboard(curlExample)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <pre>{curlExample}</pre>
              </div>
            </TabsContent>

            <TabsContent value="js">
              <div className="relative rounded-lg bg-muted border border-border/50 p-4 font-mono text-xs md:text-sm overflow-x-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => copyToClipboard(jsExample)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <pre>{jsExample}</pre>
              </div>
            </TabsContent>

            <TabsContent value="python">
              <div className="relative rounded-lg bg-muted border border-border/50 p-4 font-mono text-xs md:text-sm overflow-x-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => copyToClipboard(pythonExample)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <pre>{pythonExample}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Authenticate your requests using Bearer tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Include your API key in the <code>Authorization</code> header of
            your requests.
          </p>
          <div className="p-3 bg-muted/50 rounded-lg border border-border/50 font-mono text-sm text-muted-foreground">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
