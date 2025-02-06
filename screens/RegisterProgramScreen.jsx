import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import useSignupStore from '../store/UseSignUpStore';
import ProgramCard from '../components/ProgramBox';

const API_URL = 'https://go-muscu-api-seven.vercel.app/api/programs';

const RegisterProgramScreen = ({ navigation }) => {
  const { name, email, password, birthdate, setUserData } = useSignupStore();
  const [programs, setPrograms] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageMap = {
    '../assets/cardio.png': require('../assets/cardio.png'),
    '../assets/force.png': require('../assets/force.png'),
    '../assets/pdm.png': require('../assets/pdm.png'),
    '../assets/st.png': require('../assets/st.png'),
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPrograms(data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de récupérer les programmes.');
        console.error(error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

 const handleRegister = async () => {
  if (!selectedGoal) {
    Alert.alert('Erreur', 'Veuillez sélectionner un objectif.');
    return;
  }

  setUserData({ programID: selectedGoal });

  try {
    const response = await fetch('https://go-muscu-api-seven.vercel.app/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, birthdate, programID: selectedGoal }),
    });

    const responseData = await response.json(); 

    if (response.ok) {
      setUserData({name, email});
      Alert.alert('Succès', 'Inscription réussie !');
      navigation.navigate('Home');
    } else if (response.status === 400) { 
      Alert.alert('Erreur', 'Ce compte existe déjà.');
    } else {
      Alert.alert('Erreur', responseData.message || 'Échec de l’inscription.');
    }
  } catch (error) {
    Alert.alert('Erreur', 'Problème de connexion.');
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.container_bienvenue}>
        <Text style={styles.title}>
          Go<Text style={styles.title2}>Muscu</Text>
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#B8B8FF" />
      ) : (
        <View style={styles.container_for_program}>
          <View style={styles.container_program}>
            <View style={styles.grid}>
              {programs.map((item) => (
                <ProgramCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  image={imageMap[item.image]}
                  isSelected={selectedGoal === item._id}
                  onSelect={setSelectedGoal}
                />
              ))}
            </View>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 64, fontWeight: '400', color: '#B8B8FF', marginTop: 30, marginLeft:50 },
  title2: { fontSize: 64, fontWeight: '400', color: '#414144' },
  container_for_program: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  container_program: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
  },
  grid: {
    width: '90%',
    height: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#B8B8FF',
    height: 70,
    width: 150,
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterProgramScreen;
