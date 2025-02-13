import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base'; // ✅ Importation de NativeBaseProvider
// Import des écrans
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterProgramScreen from './screens/RegisterProgramScreen';
import ProfileScreen from './screens/ProfileScreen';
import PersonnalInfoScreen from './screens/PersonnalInfoScreen';
import { UserProvider } from './context/UserContext';
import StatisticsScreen from './screens/StatisticsScreen';
import ExercicesScreen from './screens/ExercicesScreen';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

// Création du stack navigator
const Stack = createStackNavigator();

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
      <Text style={styles.buttonText}>{i18n.language === 'en' ? '🇬🇧' : '🇫🇷'}</Text>
    </TouchableOpacity>
  );
};

export default function App() {

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NativeBaseProvider> {/* Enveloppe l'application */}
          <NavigationContainer>
            <LanguageSwitcher />

            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterProject" component={RegisterProgramScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Exercices" component={ExercicesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PersonnalInfo" component={PersonnalInfoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Statistics" component={StatisticsScreen} options={{headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
}
