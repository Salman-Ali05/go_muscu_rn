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
import { UserProvider } from './context/UserContext';
=======
import ProfileScreen from './screens/ProfileScreen';
>>>>>>> dab7089 (Profile page part 1)

// Création du stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
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
=======
    <SafeAreaProvider>
      <NativeBaseProvider> {/* ✅ Enveloppe l'application */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterProject" component={RegisterProgramScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
>>>>>>> dab7089 (Profile page part 1)
  );
}
