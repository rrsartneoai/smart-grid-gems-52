import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";
import { ChatEnergyData } from "./ChatEnergyData";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "consumption" | "production" | "efficiency";
    title: string;
  }>;
}

export function ChatMessage({ role, content, timestamp, dataVisualizations }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
      <Avatar className="h-8 w-8">
        {role === "assistant" ? (
          <>
            <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex flex-col gap-2 ${role === "assistant" ? "items-start" : "items-end"}`}>
        <div
          className={`rounded-lg px-4 py-2 max-w-[80%] ${
            role === "assistant"
              ? "bg-card text-card-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>
          {dataVisualizations?.map((viz, index) => (
            <ChatEnergyData key={index} dataType={viz.type} title={viz.title} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
}