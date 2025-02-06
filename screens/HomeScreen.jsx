import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

const API_URL = 'https://go-muscu-api-seven.vercel.app/api/programs';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [programs, setPrograms] = useState(null);

  const { user } = useUser();

  const fetchPrograms = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les programmes.');
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const selectedProgram = programs?.find((item) => item._id === user.programID)?.name;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
            <Text style={styles.titleText}>Acceuil</Text>
        </View>
        <View style={styles.photo}>
        <TouchableOpacity style={styles.photo} onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-circle" size={50} color="#B8B8FF" />
        </TouchableOpacity>
        </View>
      </View>
      

      <View style={styles.container_bienvenue}>
        <Text>Bonjour {user.name}</Text>
        <Text>Projet : {selectedProgram}</Text>
      </View>

      <View style={styles.container_for_program}>
          <View style={styles.container_program}>
              <View style={styles.grid}>
                {programs?.length > 0 ? programs.map((item) => (
                  <TouchableOpacity key={item._id} style={styles.box} onPress={() => navigation.navigate('Exercices', { id: item?._id })}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )) : (
                  <Text>Pas de programme</Text>
                )}
              </View>
          </View>
      </View>
      <Navbar />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "10%",
    width: "100%",
    marginTop: "30%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontSize: 40,
  },
  title: {
    height: "80%",
    width: "50%",
    marginLeft: 20,
  },
  photo: {
    height: "80%",
    width: "30%",
    alignItems: "center"
  },
  container_for_program: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
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
  box: {
    width: "45%",
    height: "50%",
    backgroundColor: "#B8B8FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  container_bienvenue: {
    marginLeft: 20
  },
  contain_nav: {
    width: "100%",
    height: "10%",
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default HomeScreen;