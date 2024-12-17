import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateRAGResponse } from "@/utils/ragUtils";
import { Send, Mic, MicOff } from "lucide-react";
import { stats } from "./dashboard/PowerStats";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const getDashboardValue = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  // Find matching stat based on query
  const matchingStat = stats.find(stat => {
    const title = stat.title.toLowerCase();
    return lowercaseQuery.includes(title);
  });

  if (matchingStat) {
    return `${matchingStat.title}: ${matchingStat.value}${matchingStat.unit ? ' ' + matchingStat.unit : ''} (${matchingStat.description})`;
  }

  return "I couldn't find this information in the dashboard.";
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
    const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);


  // Auto-scroll effect
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (input: string) => {
      const dashboardValue = getDashboardValue(input);
      if (dashboardValue !== "I couldn't find this information in the dashboard.") {
        return dashboardValue;
      }
      return generateRAGResponse(input);
    },
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
        speak(response);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    },
  });

    const speak = (text: string) => {
        if (!speechSynthesisRef.current) {
            speechSynthesisRef.current = window.speechSynthesis;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesisRef.current.speak(utterance);
    };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(input);
    setInput("");
  };

    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (!SpeechRecognition) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Speech recognition is not supported in this browser.",
                });
                return;
            }
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = 'pl-PL';
            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");
                setInput(transcript);
                const userMessage = { role: "user" as const, content: transcript };
                setMessages((prev) => [...prev, userMessage]);
                sendMessage(transcript);
                setIsRecording(false);
                recognitionRef.current?.stop();
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error during speech recognition. Please try again.",
                });
                setIsRecording(false);
            };
            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }


        if (!isRecording) {
            recognitionRef.current.start();
            setIsRecording(true);
        } else {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };


  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
        </Button>
          <Button
              type="button"
              onClick={handleVoiceInput}
              disabled={isPending}
          >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
      </form>
    </Card>
  );
}
