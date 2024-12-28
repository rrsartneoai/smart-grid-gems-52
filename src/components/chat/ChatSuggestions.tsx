import { Button } from "@/components/ui/button";

const suggestions = [
  "Jak wygląda zużycie energii w ostatnim miesiącu?",
  "Pokaż analizę wydajności systemu",
  "Jakie są trendy w produkcji energii?",
  "Wygeneruj raport z ostatniego kwartału",
  "Porównaj wydajność między lokalizacjami"
];

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  visible: boolean;
}

export function ChatSuggestions({ onSuggestionClick, visible }: ChatSuggestionsProps) {
  if (!visible) return null;
  
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}