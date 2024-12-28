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
  { code: "de", name: "Deutsch" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('language', langCode);
      
      // Force re-render of all components
      document.dispatchEvent(new Event('languageChanged'));
      
      const langNames = {
        pl: "Polski",
        en: "English",
        de: "Deutsch",
        uk: "Українська",
        ru: "Русский"
      };
      
      toast({
        title: t("languageChanged"),
        description: t("languageChangedTo") + " " + langNames[langCode as keyof typeof langNames],
      });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("languageChangeError"),
        variant: "destructive",
      });
    }
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