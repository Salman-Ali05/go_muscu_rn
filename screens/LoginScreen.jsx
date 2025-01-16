import React, { useState } from 'react';
import { Image, View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Ici, au lieu de localhost, mettre son addresse IPV4)
      // Ali estiam : 10.13.13.97
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Connexion réussie
        Alert.alert('Succès', `Bienvenue, ${data.user.name}`);
        // Vous pouvez rediriger vers une autre page ici
        // navigation.navigate('Dashboard');
      } else {
        // Échec de la connexion
        Alert.alert('Erreur', data.message || 'Échec de la connexion');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue, veuillez réessayer.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Go<Text style={styles.title2}>Muscu</Text>
        </Text>
      </View>
      <View style={styles.contentWrapper}>
        <Image source={require('../assets/muscuImg.png')} style={{ width: 350, height: 350, objectFit: 'contain' }} />
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.subContent}>
          Pas de compte ?{' '}
          <Text
            style={styles.subContent2}
            onPress={() => navigation.navigate('Register')}
          >
            Créez-en un ici
          </Text>
        </Text>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: '400',
    color: '#B8B8FF',
  },
  title2: {
    fontSize: 64,
    fontWeight: '400',
    color: '#414144',
  },
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  subContent: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
  },
  subContent2: {
    fontSize: 15,
    fontWeight: '400',
    color: '#9381FF',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default LoginScreen;
