import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Trash2, Upload } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);

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

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    if (files.length > 5) {
      toast({
        title: "Błąd",
        description: "Możesz przesłać maksymalnie 5 plików jednocześnie",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "Błąd",
          description: `Plik ${file.name} przekracza maksymalny rozmiar 20MB`,
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Błąd",
          description: `Plik ${file.name} ma nieobsługiwany format`,
          variant: "destructive",
        });
        return;
      }
    }

    // Handle successful file upload
    toast({
      title: "Sukces",
      description: `Przesłano ${files.length} ${files.length === 1 ? 'plik' : 'pliki'}`,
    });
  };

  return (
    <div className="p-4 border-t space-y-4 bg-background">
      <div 
        className={`p-4 border-2 border-dashed rounded-lg transition-colors ${
          dragOver ? 'border-primary bg-primary/10' : 'border-border bg-muted/30'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Przeciągnij i upuść pliki lub kliknij, aby wybrać
          </p>
          <p className="text-xs text-muted-foreground">
            Obsługiwane formaty: PDF, DOCX, PNG, JPG (max 20MB na plik, do 5 plików)
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.docx,.png,.jpg,.jpeg"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

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