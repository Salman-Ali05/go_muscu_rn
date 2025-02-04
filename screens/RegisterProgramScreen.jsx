import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import useSignupStore from '../store/UseSignUpStore';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://go-muscu-api-seven.vercel.app/api/programs'; // 

const RegisterProgramScreen = ({ navigation }) => {
  const { name, email, password, birthdate, setUserData } = useSignupStore();
  const [programs, setPrograms] = useState([]); // ✅ Stockage des programmes récupérés
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Indicateur de chargement

  //  Récupération des programmes dynamiques
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPrograms(data); // ✅ Stockage des programmes
        setLoading(false);
        console.log("reponse API", data)
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de récupérer les programmes.');
        console.error(error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  //  Fonction pour valider l'inscription avec l'ID du programme sélectionné
  const handleRegister = async () => {
    if (!selectedGoal) {
      Alert.alert('Erreur', 'Veuillez sélectionner un objectif.');
      return;
    }

    setUserData({ goal: selectedGoal }); // Enregistrement dans Zustand

    try {
      const response = await fetch('https://go-muscu-api-seven.vercel.app/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, birthdate, goal: selectedGoal }),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Inscription réussie !');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', 'Échec de l’inscription.');
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
        <ActivityIndicator size="large" color="#B8B8FF" /> // Indicateur de chargement
      ) : (
        <View style={styles.container_for_program}>
          <View style={styles.container_program}>
            <View style={styles.grid}>
              {programs.map((item) => (
                <TouchableOpacity
                  key={item._id} // ✅ Utilisation de l'ID dynamique
                  style={[
                    styles.programBox,
                    selectedGoal === item._id && styles.selectedProgram, // Ajout d'un visuel pour la sélection
                  ]}
                  onPress={() => setSelectedGoal(item._id)}
                >
                  <Image source={{ uri: item.image }} style={styles.programImage} />
                  <Text style={styles.programText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bouton pour valider l'inscription */}
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
  title: { fontSize: 64, fontWeight: '400', color: '#B8B8FF', marginTop: 30 },
  title2: { fontSize: 64, fontWeight: '400', color: '#414144' },
  container_for_program: { justifyContent: "center", alignItems: "center", flex: 1 },
  container_program: {
    height: "70%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: "20%"
  },
  grid: {
    width: "90%",
    height: "60%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  programBox: {
    width: "45%",
    height: "50%",
    backgroundColor: "#B8B8FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10
  },
  selectedProgram: {
    backgroundColor: "#4CAF50",
    borderColor: "#FFF",
    borderWidth: 2
  },
  programImage: { width: 80, height: 80, resizeMode: 'contain' },
  programText: { marginTop: 10, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#fff' },
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterProgramScreen;
