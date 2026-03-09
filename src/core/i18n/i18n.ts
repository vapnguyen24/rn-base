import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';
import en from './locales/en';
import vi from './locales/vi';

const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

function detectLanguage(): SupportedLanguage {
  const tag = findBestLanguageTag(SUPPORTED_LANGUAGES as unknown as string[]);
  return (tag?.languageTag as SupportedLanguage) ?? 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
