import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateRAGResponse } from "@/utils/ragUtils";
import { companiesData } from "@/data/companies";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "consumption" | "production" | "efficiency" | "topic";
    title: string;
  }>;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Witaj! Jestem twoim asystentem sieci energetycznej. Jak mogę Ci pomóc?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [fileContext, setFileContext] = useState<string>("");
  const { toast } = useToast();

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "Witaj! Jestem twoim asystentem sieci energetycznej. Jak mogę Ci pomóc?",
        timestamp: new Date(),
      },
    ]);
    setFileContext("");
    toast({
      title: "Konwersacja wyczyszczona",
      description: "Historia czatu została zresetowana.",
    });
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (input: string) => {
      const response = await generateRAGResponse(input, fileContext);
      return { text: response };
    },
    onSuccess: (response) => {
      const newMessage = {
        role: "assistant" as const,
        content: response.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
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

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isPending,
    clearConversation,
    addMessage,
    setFileContext
  };
};