import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { FieldComponent } from '../components/FieldComponent';
import { TouchableButton } from '../components/TouchableButton';
import { useUser } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://go-muscu-api-seven.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', `Bienvenue, ${data.user.name}`);
        setUser(data.user);
        setToken(data.token);
        navigation.navigate("Home");
      } else {
        Alert.alert('Erreur', data.message || 'Échec de la connexion');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue, veuillez réessayer.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste la position selon la plateforme
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Go<Text style={styles.title2}>Muscu</Text>
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image source={require('../assets/muscuImg.png')} style={styles.image} />
          </View>

          <View style={styles.contentWrapper}>
            {/* Champ Email */}
            <FieldComponent
              iconName="email"
              placeholder="Email"
              secureTextEntry={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {/* Champ Mot de passe */}
            <FieldComponent
              iconName="lock"
              placeholder="Mot de passe"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {/* Correction de la structure du texte */}
            <View style={styles.subContentContainer}>
              <Text style={styles.subContent}>Pas de compte ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.subContent2}> Créez-en un ici</Text>
              </TouchableOpacity>
            </View>

            <TouchableButton iconName='login' onPress={handleLogin} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontWeight: '400',
    color: '#B8B8FF',
    marginTop: 30,
  },
  title2: {
    fontSize: 55,
    fontWeight: '400',
    color: '#414144',
  },
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  subContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  subContent: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
  },
  subContent2: {
    fontSize: 15,
    color: '#9381FF',
  },
});

export default LoginScreen;
