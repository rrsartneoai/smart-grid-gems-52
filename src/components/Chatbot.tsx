import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateRAGResponse } from "@/utils/ragUtils";
import { useConversation } from "@11labs/react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { stats } from "./dashboard/PowerStats";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const getDashboardValue = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Witaj! Jestem twoim asystentem sieci energetycznej. Jak mogę Ci pomóc?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const conversation = useConversation({
    apiKey: localStorage.getItem('ELEVENLABS_API_KEY') || '',
    overrides: {
      tts: {
        voiceId: "XB0fDUnXU5powFXDhCwa",
      },
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      toast({
        variant: "destructive",
        title: "Błąd głosowy",
        description: "Wystąpił problem z syntezą głosu. Sprawdź czy klucz API jest poprawny.",
      });
    },
  });

  useEffect(() => {
    const apiKey = localStorage.getItem('ELEVENLABS_API_KEY');
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "Wymagany klucz API",
        description: "Wprowadź swój klucz API ElevenLabs w ustawieniach, aby włączyć funkcje głosowe.",
        duration: 5000,
      });
    } else {
      // Sprawdź poprawność klucza API przy starcie
      fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': apiKey
        }
      }).catch(error => {
        console.error('Error validating API key:', error);
        toast({
          variant: "destructive",
          title: "Błędny klucz API",
          description: "Twój klucz API ElevenLabs jest nieprawidłowy. Sprawdź ustawienia.",
          duration: 5000,
        });
      });
    }
  }, [toast]);

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
      const newMessage = {
        role: "assistant" as const,
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      
      const apiKey = localStorage.getItem('ELEVENLABS_API_KEY');
      if (apiKey) {
        conversation.startSession({
          agentId: "default",
        }).then(() => {
          conversation.setVolume({ volume: 0.8 });
        }).catch(error => {
          console.error('Error starting ElevenLabs session:', error);
          toast({
            variant: "destructive",
            title: "Voice Error",
            description: "Failed to start voice synthesis. Please check your API key.",
          });
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
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
        const userMessage = { role: "user" as const, content: transcript, timestamp: new Date() };
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

  const handleStopSpeaking = () => {
    conversation.endSession();
  };

  const handleSaveHistory = () => {
    const historyText = messages
      .map((msg) => {
        const time = format(msg.timestamp, "HH:mm", { locale: pl });
        return `[${time}] ${msg.role === "user" ? "Użytkownik" : "Asystent"}: ${msg.content}`;
      })
      .join("\n\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${format(new Date(), "yyyy-MM-dd-HH-mm")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Historia zapisana",
      description: "Plik z historią czatu został pobrany.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-background">
      <ChatHeader
        isSpeaking={conversation.isSpeaking}
        onStopSpeaking={handleStopSpeaking}
        onSaveHistory={handleSaveHistory}
      />
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} {...message} />
        ))}
      </ScrollArea>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleVoiceInput={handleVoiceInput}
        isRecording={isRecording}
        isPending={isPending}
      />
    </Card>
  );
}
