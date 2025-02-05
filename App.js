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
<<<<<<< HEAD
import ProfileScreen from './screens/ProfileScreen';
import PersonnalInfoScreen from './screens/PersonnalInfoScreen';
=======
import { UserProvider } from './context/UserContext';
>>>>>>> 8db3fff (added context user to store token & user object)

// Création du stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
    <SafeAreaProvider>
      <NativeBaseProvider> {/* ✅ Enveloppe l'application */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterProject" component={RegisterProgramScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Personal" component={PersonnalInfoScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
=======
    <UserProvider>
      <SafeAreaProvider>
        <NativeBaseProvider> {/* ✅ Enveloppe l'application */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterProject" component={RegisterProgramScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </UserProvider>
>>>>>>> 8db3fff (added context user to store token & user object)
  );
}
