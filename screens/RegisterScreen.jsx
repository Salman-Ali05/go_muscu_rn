import React, { useState } from 'react';
import { 
  Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setBirthdate(formattedDate);
    hideDatePicker();
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('https://go-muscu-api-seven.vercel.app/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, birthdate }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Votre compte a été créé avec succès');
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
        <Icon name="arrow-back" size={30} color="#000" onPress={() => navigation.goBack()} />  
        <Text style={styles.title}>
          Go<Text style={styles.title2}>Muscu</Text>
        </Text>
      </View>

      {/* Conteneur avec ScrollView pour éviter le débordement */}
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        {/*  Image plus petite pour laisser de la place */}
        <Image source={require('../assets/muscuImg.png')} style={styles.image} />

        {/*  Champ Nom */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#e6e7e7" style={styles.icon} />  
          <TextInput
            placeholder="Nom d'utilisateur"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#e6e7e7"
          />
        </View>

        {/* Champ Email */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#e6e7e7" style={styles.icon} />  
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#e6e7e7"
          />
        </View>

        {/*  Champ Mot de passe */}
        <View style={styles.inputContainer}>   
          <Icon name="lock" size={20} color="#e6e7e7" style={styles.icon} />   
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#e6e7e7"
          />
        </View>

        {/* Champ Date de naissance */}
        <View style={styles.inputContainer}>
          <Icon name="calendar-today" size={20} color="#e6e7e7" style={styles.icon} />
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="Date de naissance"
              value={birthdate}
              editable={false}
              placeholderTextColor="#e6e7e7"
            />
          </TouchableOpacity>
        </View>

        {/* Modale DatePicker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        {/* Conteneur des boutons remonté */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
            <Icon name="login" size={30} color="#e6e7e7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('RegisterProject')}>
            <Icon name="home" size={30} color="#e6e7e7" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Remonte tout le contenu
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48, // Réduit pour économiser de l'espace
    fontWeight: '400',
    color: '#B8B8FF',
  },
  title2: {
    fontSize: 48,
    fontWeight: '400',
    color: '#414144',
  },
  formContainer: {
    alignItems: 'center',
    paddingBottom: 40, //  Évite que le dernier bouton soit coupé
  },
  image: {
    width: 250, //  Taille réduite
    height: 250, // Moins d'espace pris
    objectFit: 'contain',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 50,
    width: 300,
    marginBottom: 15, //  Réduit l'espacement pour économiser de la place
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: '#B8B8FF',
    height: 60, //  Taille plus petite pour économiser de l'espace
    width: 60, 
    borderRadius: 30,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20, // Ajout d'une marge pour éviter l'écrasement
  },
});

export default RegisterScreen;
