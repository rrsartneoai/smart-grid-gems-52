import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import en from './translations/en';
import pl from './translations/pl';
import de from './translations/de';
import uk from './translations/uk';
import ru from './translations/ru';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      pl,
      de,
      uk,
      ru
    },
    fallbackLng: 'pl',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;