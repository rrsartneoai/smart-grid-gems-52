import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function TranslationProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return <>{children}</>;
}