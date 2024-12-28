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
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    const prevLang = i18n.language;
    i18n.changeLanguage(langCode).then(() => {
      localStorage.setItem('language', langCode);
      
      const selectedLang = languages.find(lang => lang.code === langCode);
      if (selectedLang) {
        toast({
          title: t("languageChanged"),
          description: `${selectedLang.flag} ${selectedLang.name}`,
          duration: 2000,
        });
      }

      // Trigger a page refresh to ensure all components are properly translated
      if (prevLang !== langCode) {
        window.location.reload();
      }
    });
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative hover:bg-accent"
        >
          <Languages className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1 text-xs">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              i18n.language === lang.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}