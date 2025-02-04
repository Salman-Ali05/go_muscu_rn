import React, { useState } from 'react';
import { 
  Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useSignupStore from '../store/UseSignUpStore'; // ✅ Utilisation de Zustand pour stocker les données
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const setUserData = useSignupStore((state) => state.setUserData);

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

  const handleNextStep = () => {
    if (!name || !email || !password || !birthdate) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Stocker les données temporairement avec Zustand
    setUserData({ name, email, password, birthdate });

    // Rediriger vers l'écran de sélection d'objectif
    navigation.navigate('RegisterProject');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="arrow-back" size={30} color="#000" onPress={() => navigation.goBack()} style={styles.backIcon} />  
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

        {/* Bouton Suivant */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleNextStep}>
            <Icon name="arrow-forward" size={30} color="#e6e7e7" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  title: {
    fontSize: 48,
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
    paddingBottom: 40,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 50,
    width: 300,
    marginBottom: 15,
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
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
