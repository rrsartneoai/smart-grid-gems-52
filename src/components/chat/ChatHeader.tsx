import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Save, StopCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  onSaveHistory: () => void;
}

export function ChatHeader({ isSpeaking, onStopSpeaking, onSaveHistory }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
          <AvatarFallback><Bot className="h-6 w-6" /></AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Asystent Sieci Energetycznej</h3>
          <p className="text-sm text-muted-foreground">Zawsze online</p>
        </div>
      </div>
      <div className="flex gap-2">
        {isSpeaking && (
          <Button
            variant="outline"
            size="icon"
            onClick={onStopSpeaking}
            className="text-red-500"
          >
            <StopCircle className="h-4 w-4" />
          </Button>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1">Zapisz</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSaveHistory}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zapisz historię rozmowy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}