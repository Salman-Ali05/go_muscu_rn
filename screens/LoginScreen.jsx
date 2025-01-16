// screens/LoginScreen.js
import React from 'react';
import { Image } from 'react-native';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
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
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />
        <Text style={styles.subContent}>
          Pas de compte ? <Text style={styles.subContent2}>Créez-en un ici</Text>
        </Text>
        <Button title="Login" onPress={() => {}} />
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate('Register')}
        />
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
    fontWeight: 400,
    color: '#B8B8FF',
  },
  title2: {
    fontSize: 64,
    fontWeight: 400,
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
    fontWeight: 400,
    color: '#000000',
  },
  subContent2: {
    fontSize: 15,
    fontWeight: 400,
    color: '#9381FF',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
  }
});

export default LoginScreen;