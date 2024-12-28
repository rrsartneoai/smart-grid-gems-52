import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { ChatFileUpload } from "./ChatFileUpload";
import { toast } from "sonner";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [fileSummaries, setFileSummaries] = useState<string[]>([]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFileProcessComplete = (text: string, topics: string[]) => {
    setFileSummaries(topics);
    toast("Plik przetworzony", {
      description: "Kliknij w temat, aby uzyskać więcej informacji"
    });
    setShowFileUpload(false);
  };

  const handleTopicClick = (topic: string) => {
    const message = `Opowiedz mi więcej o temacie: ${topic}`;
    setInput(message);
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    setFileSummaries([]);
  };

  return (
    <div className="p-4 border-t space-y-4 bg-background">
      {showFileUpload && (
        <ChatFileUpload onProcessComplete={handleFileProcessComplete} />
      )}

      {fileSummaries.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {fileSummaries.map((topic, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napisz wiadomość... (Enter aby wysłać, Shift + Enter dla nowej linii)"
          className="flex-1 min-h-[80px] max-h-[200px] resize-none text-base p-4"
          disabled={isPending}
        />
        
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="outline"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="shadow-sm h-11 w-11"
                >
                  <Upload className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showFileUpload ? "Ukryj wgrywanie plików" : "Pokaż wgrywanie plików"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={isPending} className="shadow-sm h-11 w-11">
                  <Send className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wyślij wiadomość (Enter)</p>
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
                  className="shadow-sm h-11 w-11"
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? "Zatrzymaj nagrywanie" : "Rozpocznij nagrywanie"}</p>
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
                  className="shadow-sm h-11 w-11"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wyczyść rozmowę</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
}