import React, { useState } from 'react';
<<<<<<< HEAD
import { Image, View, Text, TextInput, StyleSheet, Alert, Touchable, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { FieldComponent } from '../components/FieldComponent';
import { TouchableButton } from '../components/TouchableButton';
import { useUser } from '../context/UserContext';
=======
import { Image, View, Text, Button, TextInput, StyleSheet, Alert, Touchable, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes
>>>>>>> dab7089 (Profile page part 1)

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { t } = useTranslation();
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
<<<<<<< HEAD
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
        <Image source={require('../assets/muscuImg.png')} style={styles.Image} />
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

        <Text style={styles.subContent}>
          Pas de compte ?{' '}
          <Text
            style={styles.subContent2}
            onPress={() => navigation.navigate('Register')}
          >
            Créez-en un ici
          </Text>
        </Text>
        <TouchableButton iconName='login' onPress={handleLogin} />
      </View>
    </View>
    </TouchableWithoutFeedback>
=======
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste la position selon la plateforme
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text>Go</Text><Text style={styles.title2}>Muscu</Text>
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/muscuImg.png')} style={styles.Image} />
          </View>
          <View style={styles.contentWrapper}>

            {/* Champ Email */}
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#e6e7e7" style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#e6e7e7"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* Champ Mot de passe */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#e6e7e7" style={styles.icon} />
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#e6e7e7"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <Text style={styles.subContent}>
              Pas de compte ?{' '}
              <Text
                style={styles.subContent2}
                onPress={() => navigation.navigate('Register')}
              >
                Créez-en un ici
              </Text>
            </Text>
            <View style={styles.footerContainer}>
              <TouchableOpacity style={styles.buttonStyle}>
                <Icon name="login" size={30} color="#e6e7e7" style={styles.icon} onPress={handleLogin} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
>>>>>>> dab7089 (Profile page part 1)
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
  inputContainer: {
    flexDirection: 'row', // Place les icônes et les champs côte à côte
    alignItems: 'center',
    backgroundColor: '#B8B8FF', // Couleur de fond
    borderRadius: 40, // Arrondi
    height: 60,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10, // Espace entre l'icône et le champ
  },
  input: {
    flex: 1, // Prend tout l'espace restant
    fontSize: 16,
    color: '#fff', // Couleur du texte
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
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#B8B8FF', // Couleur de fond
    height: 70,
    width: 70,
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  Image: {
    width: 300,
    height: 250,
    objectFit: 'contain',
  }
});

export default LoginScreen;
