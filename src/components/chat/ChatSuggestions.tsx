import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  visible: boolean;
}

export function ChatSuggestions({ onSuggestionClick, visible }: ChatSuggestionsProps) {
  if (!visible) return null;
  return null; // We're removing the suggestions completely
}