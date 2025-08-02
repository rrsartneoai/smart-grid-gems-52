import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "consumption" | "production" | "efficiency" | "topic";
    title: string;
  }>;
  onTopicClick?: (topic: string) => void;
}

export function ChatMessage({ role, content, timestamp, dataVisualizations = [], onTopicClick }: ChatMessageProps) {
  const time = format(timestamp, "HH:mm", { locale: pl });
  const isAssistant = role === "assistant";

  // Add example topics if no topics are provided and it's the first assistant message
  const topics = dataVisualizations.length === 0 && isAssistant ? [
    { type: "topic" as const, title: "Zużycie energii" },
    { type: "topic" as const, title: "Produkcja energii" },
    { type: "topic" as const, title: "Wydajność systemu" },
    { type: "topic" as const, title: "Status urządzeń" },
    { type: "topic" as const, title: "Analiza sieci" }
  ] : dataVisualizations;

  const handleTopicClick = (topic: string) => {
    if (onTopicClick) {
      onTopicClick(topic);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <Avatar>
          <img src="/lovable-uploads/39b9c17b-f3a0-4537-bafa-6950cdc12a08.png" alt="Assistant" className="w-10 h-10 rounded-full" />
        </Avatar>
      )}
      <div className="flex flex-col gap-2 max-w-[80%]">
        <div
          className={cn(
            "rounded-lg p-3",
            isAssistant
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          
          {topics && topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((viz, index) => {
                if (viz.type === "topic") {
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTopicClick(viz.title)}
                      className="text-sm"
                    >
                      {viz.title}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      {!isAssistant && (
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            U
          </div>
        </Avatar>
      )}
    </div>
  );
}