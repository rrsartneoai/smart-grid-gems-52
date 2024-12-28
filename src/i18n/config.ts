import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "monitoringPanel": "Monitoring Panel",
      "smartgridDescription": "smartgrid energy efficiency in Pomerania",
      "configureApiKey": "Configure API Key",
      "spaces": "Spaces",
      "analysis": "Analysis",
      "status": "Status",
      "sensors": "Sensors",
      "uploadFile": "Upload File",
      "aiAssistant": "AI Assistant"
    }
  },
  pl: {
    translation: {
      "monitoringPanel": "Panel Monitoringu",
      "smartgridDescription": "efektywność energetyczna smartgrid na Pomorzu",
      "configureApiKey": "Konfiguruj klucz API",
      "spaces": "Przestrzenie",
      "analysis": "Analiza",
      "status": "Status",
      "sensors": "Czujniki",
      "uploadFile": "Wgraj plik",
      "aiAssistant": "Asystent AI"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'pl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;