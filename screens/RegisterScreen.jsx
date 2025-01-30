import React, { useState } from 'react';
import {Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes



const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateRegisterProgram = () => {
    navigation.navigate('RegisterProject');
  }

  const handleRegister = async () => {
    try {
      // Ici, au lieu de localhost, mettre son addresse IPV4)
      // Ali estiam : 10.13.13.97
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Votre compte a été créé avec succès');
        // Rediriger vers la page de connexion
        navigation.navigate('Login');
      } else {
        Alert.alert('Erreur', data.message || 'Échec de la création du compte');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue, veuillez réessayer.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
      <Icon name="back" size={20} color="#000000" style={styles.icon} />  
        <Text style={styles.title}>
          Go<Text style={styles.title2}>Muscu</Text>
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/muscuImg.png')} style={{ width: 350, height: 350, objectFit: 'contain' }} />
      </View>

      {/* champ user */}
      <View style={styles.inputContainer}>
      <Icon name="home" size={20} color="#e6e7e7" style={styles.icon} />  
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#e6e7e7"
        />  
      </View>

      {/* champ email */}  
      <View style={styles.inputContainer}>
      <Icon name="email" size={20} color="#e6e7e7" style={styles.icon} />  
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#e6e7e7"
        />
      </View>

      {/* champ email */}  
      
      <View style={styles.inputContainer}>   
      <Icon name="lock" size={20} color="#e6e7e7" style={styles.icon} />   
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#e6e7e7"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Icon name="login" size={30} color="#e6e7e7" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNavigateRegisterProgram}>
          <Icon name="home" size={30} color="#e6e7e7" />
        </TouchableOpacity>
      </View>
      {/* <Button title="Créer un compte" onPress={handleRegister} />
      <Button
        title="Retour à la connexion"
        onPress={() => navigation.navigate('Login')}
      /> */}
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
    marginTop: 30,
  },
  title2: {
    fontSize: 64,
    fontWeight: '400',
    color: '#414144',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 50,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 15,
    marginLeft:10

  },
  buttonStyle: {
    backgroundColor: '#B8B8FF', // Couleur de fond
    paddingVertical: 15, 
    paddingHorizontal: 10,
    height: 70, 
    width: 70, 
    borderRadius: 35, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  }
});

export default RegisterScreen;
