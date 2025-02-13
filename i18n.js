import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

// Fonction d'initialisation
const initI18n = async () => {
  try {
    let savedLanguage = await AsyncStorage.getItem("language");

    if (!savedLanguage) {
      savedLanguage = Localization.locale.split('-')[0]; // Récupère la langue du système (ex: "fr" ou "en")
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

    console.log("i18n initialized with language:", savedLanguage);
    return i18n.isInitialized;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de i18n :", error);
    return false;
  }
};

export { initI18n };
export default i18n;