import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ELEVENLABS_API_KEY') || '');
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    localStorage.setItem('ELEVENLABS_API_KEY', apiKey);
    toast({
      title: "API Key Saved",
      description: "Your ElevenLabs API key has been saved successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Configure API Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ElevenLabs API Key</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="apiKey"
              placeholder="Enter your ElevenLabs API key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              You can find your API key in the{" "}
              <a
                href="https://elevenlabs.io/speech-synthesis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ElevenLabs dashboard
              </a>
            </p>
          </div>
          <Button onClick={handleSaveApiKey}>Save API Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}