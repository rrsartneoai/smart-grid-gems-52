import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  return (
    <div
      className={`mb-6 flex items-start gap-4 ${
        role === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-10 w-10 shadow-sm">
        {role === "user" ? (
          <>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary">
              <User className="h-5 w-5 text-primary-foreground" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
            <AvatarFallback>
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex flex-col gap-1.5 max-w-[80%]">
        <div
          className={`rounded-2xl p-4 shadow-sm ${
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-card border"
          }`}
        >
          <p className="text-base leading-relaxed break-words">{content}</p>
        </div>
        <span className="text-sm text-muted-foreground px-1">
          {format(timestamp, "HH:mm", { locale: pl })}
        </span>
      </div>
    </div>
  );
}