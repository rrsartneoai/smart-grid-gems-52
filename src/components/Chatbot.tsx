import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Download, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    "Jak mogę zoptymalizować zużycie energii?",
    "Jakie są aktualne trendy w zużyciu?",
    "Pokaż statystyki dla ostatniego miesiąca",
    "Porównaj zużycie między lokalizacjami"
  ];

  useEffect(() => {
    if (inputValue) {
      const filtered = commonQuestions.filter(q => 
        q.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setSuggestions([]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Dziękuję za pytanie. Analizuję dane...",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredMessages = searchQuery
    ? messages.filter(msg => 
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const exportChat = () => {
    const pdf = new jsPDF();
    let y = 10;
    
    messages.forEach((msg) => {
      const text = `${msg.sender === 'user' ? 'Ty' : 'Bot'} (${msg.timestamp.toLocaleTimeString()}): ${msg.text}`;
      const splitText = pdf.splitTextToSize(text, 180);
      
      if (y + 10 * splitText.length > pdf.internal.pageSize.height - 10) {
        pdf.addPage();
        y = 10;
      }
      
      pdf.text(splitText, 10, y);
      y += 10 * splitText.length;
    });
    
    pdf.save('historia-czatu.pdf');
    toast({
      title: "Eksport zakończony",
      description: "Historia czatu została zapisana do pliku PDF",
    });
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj w historii czatu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon" onClick={exportChat}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        {suggestions.length > 0 && (
          <div className="mb-2 space-y-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-muted rounded cursor-pointer text-sm"
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Input
            placeholder="Napisz wiadomość..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};