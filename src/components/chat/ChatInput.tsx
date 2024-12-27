import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleVoiceInput: () => void;
  handleClearConversation: () => void;
  isRecording: boolean;
  isPending: boolean;
}

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  handleVoiceInput,
  handleClearConversation,
  isRecording,
  isPending,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex gap-3 bg-background">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Napisz wiadomość..."
        className="flex-1 text-base"
        disabled={isPending}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="submit" size="icon" disabled={isPending} className="shadow-sm">
              <Send className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wyślij wiadomość</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleVoiceInput}
              disabled={isPending}
              className="shadow-sm"
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isRecording ? 'Zatrzymaj nagrywanie' : 'Rozpocznij nagrywanie'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleClearConversation}
              disabled={isPending}
              className="shadow-sm"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wyczyść rozmowę</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}