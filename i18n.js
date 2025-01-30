import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  "fr": { translation: fr },
  "en": { translation: en },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale.split('-')[0];
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n.isInitialized;
};

export { initI18n };
export default i18n;
