import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    toast({
      title: langCode === 'pl' ? "Zmieniono język" : "Language changed",
      description: langCode === 'pl' ? "Język został zmieniony na Polski" : "Language has been changed to English",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={i18n.language === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}