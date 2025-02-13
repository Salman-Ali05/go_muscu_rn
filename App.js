import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { UserProvider } from "./context/UserContext";
import { initI18n } from "./i18n";
import { useTranslation } from "react-i18next";

// Import des écrans
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterProgramScreen from "./screens/RegisterProgramScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PersonnalInfoScreen from "./screens/PersonnalInfoScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import ExercicesScreen from "./screens/ExercicesScreen";

const Stack = createStackNavigator();

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = async () => {
    if (!i18n || !i18n.changeLanguage) {
      console.error("i18n n'est pas initialisé !");
      return;
    }
    const newLang = i18n.language === "en" ? "fr" : "en";
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem("language", newLang); // Sauvegarde la langue choisie
  };

  return (
    <View style={styles.languageWrapper}>
      <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
        <Text style={styles.buttonText}>{i18n.language === "en" ? "🇬🇧" : "🇫🇷"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [isI18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      const initialized = await initI18n();
      setI18nInitialized(initialized);
    };
    initializeI18n();
  }, []);

  if (!isI18nInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B8B8FF" />
      </View>
    );
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            {/* Bouton de changement de langue */}
            <LanguageSwitcher />

            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterProject" component={RegisterProgramScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Exercices" component={ExercicesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PersonnalInfo" component={PersonnalInfoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  languageWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
  },
  languageButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
