import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from 'react-native-vector-icons';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { initI18n } from './i18n';

const Stack = createStackNavigator();

const App = () => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const initializeI18n = async () => {
      await initI18n();
      setIsReady(true);
    };

    initializeI18n();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: t('login'),
            headerRight: () => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="language"
                  size={24}
                  color="black"
                  onPress={() => {
                    const currentLang = i18n.language;
                    const newLang = currentLang === 'en' ? 'fr' : 'en';
                    changeLanguage(newLang);
                  }}
                  style={styles.icon}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: t('register'),
            headerRight: () => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="language"
                  size={24}
                  color="black"
                  onPress={() => {
                    const currentLang = i18n.language;
                    const newLang = currentLang === 'en' ? 'fr' : 'en';
                    changeLanguage(newLang);
                  }}
                  style={styles.icon}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 10,
  },
  icon: {
    padding: 10,
  },
});

export default App;
