import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgramBox from '../components/ProgramItem';
import useSignupStore from '../store/UseSignUpStore'; // ✅ Ajout du store Zustand

const RegisterProgramScreen = ({ navigation }) => {
  const { name, email, password, birthdate, setUserData } = useSignupStore();
  const [selectedGoal, setSelectedGoal] = useState(null); // ✅ Stocke l'objectif sélectionné avant validation

  const programs = [
    { id: 1, key: 'pdm', name: 'Prise de masse', img: require('../assets/pdm.png') },
    { id: 2, key: 'force', name: 'Force', img: require('../assets/force.png') },
    { id: 3, key: 'cardio', name: 'Cardio', img: require('../assets/cardio.png') },
    { id: 4, key: 'sw', name: 'StreetWorkout', img: require('../assets/st.png') }
  ];

  // Fonction pour enregistrer l'objectif et finaliser l'inscription
  const handleRegister = async () => {
    if (!selectedGoal) {
      Alert.alert('Erreur', 'Veuillez sélectionner un objectif.');
      return;
    }

    // Enregistrement dans Zustand
    setUserData({ goal: selectedGoal });

    try {
      const response = await fetch('https://go-muscu-api-seven.vercel.app/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, birthdate, goal: selectedGoal }),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Inscription réussie !');
        navigation.navigate('Home'); // ✅ Redirection vers l'accueil après succès
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

      <View style={styles.container_for_program}>
        <View style={styles.container_program}>
          <View style={styles.grid}>
            {programs.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.programBox,
                  selectedGoal === item.key && styles.selectedProgram // Ajout d'un visuel pour l'objectif sélectionné
                ]}
                onPress={() => setSelectedGoal(item.key)}
              >
                <Image source={item.img} style={styles.programImage} />
                <Text style={styles.programText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bouton pour valider l'inscription après sélection */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
            <Icon name="check" size={30} color="#e6e7e7" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleContainer: { display: 'flex', alignItems: 'center' },
  title: { fontSize: 64, fontWeight: '400', color: '#B8B8FF', marginTop: 30 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 70,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  title2: { fontSize: 64, fontWeight: '400', color: '#414144' },
  header: {
    height: "10%",
    width: "100%",
    marginTop: "30%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
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
    backgroundColor: "#4CAF50", // ✅ Couleur différente pour montrer l'objectif sélectionné
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
    gap: 20,
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#B8B8FF',
    height: 70,
    width: 70,
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterProgramScreen;
