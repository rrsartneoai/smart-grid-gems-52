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
      className={`mb-4 flex items-start gap-3 ${
        role === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-8 w-8 mt-1">
        {role === "user" ? (
          <>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex flex-col gap-1">
        <div
          className={`rounded-lg p-3 max-w-[80%] ${
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {content}
        </div>
        <span className="text-xs text-muted-foreground">
          {format(timestamp, "HH:mm", { locale: pl })}
        </span>
      </div>
    </div>
  );
}