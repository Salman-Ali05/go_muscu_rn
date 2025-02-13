import React, { useState } from 'react';
import {
  Image, View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { FieldComponent } from '../components/FieldComponent';
import { TouchableButton } from '../components/TouchableButton';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const RegisterScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setUser } = useUser();

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

    setUser({ name, email, password, birthdate });

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

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Image source={require('../assets/muscuImg.png')} style={styles.image} />

        <FieldComponent iconName="person" placeholder={t('username')} value={name} onChangeText={setName} />
        <FieldComponent iconName="email" placeholder={t('email')} value={email} onChangeText={setEmail} />
        <FieldComponent iconName="lock" placeholder={t('password')} secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity onPress={showDatePicker} style={styles.dateInputContainer}>
          <Icon name="calendar-today" size={20} color="#e6e7e7" style={styles.icon} />
          <Text style={[styles.input, !birthdate && styles.placeholderText]}>
            {birthdate ? birthdate : t('birthdate')}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />

        <TouchableButton iconName='arrow-forward' onPress={handleNextStep} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  title: {
    fontSize: 48,
    fontWeight: '400',
    color: '#B8B8FF'
  },
  title2: {
    fontSize: 48,
    fontWeight: '400',
    color: '#414144'
  },
  formContainer: {
    alignItems: 'center',
    paddingBottom: 40
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40, height: 50,
    width: 300, marginBottom: 15,
    paddingHorizontal: 15
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10
  },
  placeholderText: {
    color: '#e6e7e7'
  },
});

export default RegisterScreen;
