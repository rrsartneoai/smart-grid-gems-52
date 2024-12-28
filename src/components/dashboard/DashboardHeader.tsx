import { DarkModeToggle } from "@/components/DarkModeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationCenter } from "@/components/ui/notifications/NotificationCenter";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const DashboardHeader = ({ isHeaderVisible }: { isHeaderVisible: boolean }) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
          <ApiKeySettings />
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h1 className="text-xl font-semibold text-center sm:text-left">
              {t('monitoringPanel')}
            </h1>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {t('smartgridDescription')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LanguageSelector />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('changeLanguage')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NotificationCenter />
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};