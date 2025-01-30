import React, { useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // ✅ Import du DatePicker

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(''); // ✅ Stocke la date sélectionnée
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // ✅ Gérer l'affichage du DatePicker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // ✅ Gérer la sélection de la date
  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // 📅 Format YYYY-MM-DD
    setBirthdate(formattedDate);
    hideDatePicker();
  };

  const handleNavigateRegisterProgram = () => {
    navigation.navigate('RegisterProject');
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.13.15.160:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, birthdate }), // ✅ Envoie la date
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

      <View style={styles.imageContainer}>
        <Image source={require('../assets/muscuImg.png')} style={{ width: 350, height: 350, objectFit: 'contain' }} />
      </View>

      {/* Champ Nom d'utilisateur */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#e6e7e7" style={styles.icon} />  
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
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
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#e6e7e7"
        />
      </View>

      {/* Champ Mot de passe */}
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

      {/* ✅ Champ Date de naissance */}
      <View style={styles.inputContainer}>
        <Icon name="calendar-today" size={20} color="#e6e7e7" style={styles.icon} />
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Date de naissance"
            value={birthdate}
            editable={false} // ✅ Empêche la saisie manuelle
            placeholderTextColor="#e6e7e7"
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Modale de sélection de date */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
          <Icon name="login" size={30} color="#e6e7e7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNavigateRegisterProgram}>
          <Icon name="home" size={30} color="#e6e7e7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20,
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 50,
    width: 300,
    marginBottom: 20,
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
    height: 70, 
    width: 70, 
    borderRadius: 35,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default RegisterScreen;
