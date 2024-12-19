import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleVoiceInput: () => void;
  isRecording: boolean;
  isPending: boolean;
}

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  handleVoiceInput,
  isRecording,
  isPending,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-background">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Napisz wiadomość..."
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" size="icon" disabled={isPending}>
        <Send className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={handleVoiceInput}
        disabled={isPending}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </form>
  );
}