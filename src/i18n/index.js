import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enUS, es } from 'date-fns/locale';

import en from './en.json';
import esTranslations from './es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: esTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export const dateLocales = { en: enUS, es };

export default i18n;
