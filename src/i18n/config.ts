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
      "aiAssistant": "AI Assistant",
      "dataComparison": "Data Comparison",
      "selectCity": "Select City",
      "selectParameter": "Select Parameter",
      "comparison": "Comparison"
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
      "aiAssistant": "Asystent AI",
      "dataComparison": "Porównanie Danych",
      "selectCity": "Wybierz Miasto",
      "selectParameter": "Wybierz Parametr",
      "comparison": "Porównanie"
    }
  },
  de: {
    translation: {
      "monitoringPanel": "Überwachungspanel",
      "smartgridDescription": "Smartgrid-Energieeffizienz in Pommern",
      "configureApiKey": "API-Schlüssel konfigurieren",
      "spaces": "Räume",
      "analysis": "Analyse",
      "status": "Status",
      "sensors": "Sensoren",
      "uploadFile": "Datei hochladen",
      "aiAssistant": "KI-Assistent",
      "dataComparison": "Datenvergleich",
      "selectCity": "Stadt auswählen",
      "selectParameter": "Parameter auswählen",
      "comparison": "Vergleich"
    }
  },
  uk: {
    translation: {
      "monitoringPanel": "Панель моніторингу",
      "smartgridDescription": "енергоефективність смартгрід у Померанії",
      "configureApiKey": "Налаштувати API ключ",
      "spaces": "Простори",
      "analysis": "Аналіз",
      "status": "Статус",
      "sensors": "Датчики",
      "uploadFile": "Завантажити файл",
      "aiAssistant": "AI асистент",
      "dataComparison": "Порівняння даних",
      "selectCity": "Вибрати місто",
      "selectParameter": "Вибрати параметр",
      "comparison": "Порівняння"
    }
  },
  ru: {
    translation: {
      "monitoringPanel": "Панель мониторинга",
      "smartgridDescription": "энергоэффективность смартгрид в Померании",
      "configureApiKey": "Настроить API ключ",
      "spaces": "Пространства",
      "analysis": "Анализ",
      "status": "Статус",
      "sensors": "Датчики",
      "uploadFile": "Загрузить файл",
      "aiAssistant": "AI ассистент",
      "dataComparison": "Сравнение данных",
      "selectCity": "Выбрать город",
      "selectParameter": "Выбрать параметр",
      "comparison": "Сравнение"
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