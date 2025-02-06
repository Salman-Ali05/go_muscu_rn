import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [program, setProgram] = useState(null);

  const { user, token } = useUser();

  const id = user.programID;

  const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const imageMap = {
        '../assets/triceps_skull.jpg': require('../assets/triceps_skull.jpg'),
        '../assets/jambes_squat.jpg': require('../assets/jambes_squat.jpg'),
        '../assets/epaules_dev.jpg': require('../assets/epaules_dev.jpg'),
        '../assets/dos_tractions.jpg': require('../assets/dos_tractions.jpg'),
        '../assets/dos_rowing.jpg': require('../assets/dos_rowing.jpg'),
        '../assets/pect_coucher.jpg': require('../assets/pect_coucher.jpg'),
        '../assets/jambes_mollets.jpg': require('../assets/jambes_mollets.jpg'),
        '../assets/triceps_poulie.jpg': require('../assets/triceps_poulie.jpg'),
        '../assets/bicep_hammer.jpg': require('../assets/bicep_hammer.jpg'),
        '../assets/dos_rowing.jpg': require('../assets/dos_rowing.jpg'),
        '../assets/dos_tractions.jpg': require('../assets/dos_tractions.jpg'),
        '../assets/epaules_lateral.jpg': require('../assets/epaules_lateral.jpg'),
        '../assets/epaules_dev.jpg': require('../assets/epaules_dev.jpg'),
      };

  async function fetchProgram() {
    if (!user || !id) {
        return;
    }

    try {
        const response = await fetch(`https://go-muscu-api-seven.vercel.app/api/programs/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch program');
        }

        const data = await response.json();
        setProgram(data);
    } catch (error) {
        console.error('Error fetching program:', error);
    }
  }

  useEffect(() => {    
    fetchProgram();
  }, [id]);

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
       <Text>Projet : {program && program.name}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <View style={styles.container_for_program}>
            <View style={styles.container_program}>
                <View style={styles.grid}>
                    {program?.exercises?.length > 0 ? (
                        program.exercises.map((ex) => {
                            const id = ex._id;

                            return (
                                <TouchableOpacity key={id} onPress={() => toggleExpand(id)}>
                                    <View style={styles.box}>
                                        <View style={styles.boxTitle}>
                                            <Text>{ex.name}</Text>
                                            <Icon name={expanded[id] ? 'chevron-up' : 'chevron-down'} size={24} />
                                        </View>

                                        {expanded[id] && (
                                            <View style={styles.boxContent}>
                                                <Image source={imageMap[ex.image]} style={styles.exoImg} />
                                                <View style={styles.exoContent}>
                                                    <Text>Séries : 4</Text>
                                                    <Text>Répétitions : {program.nbRep}</Text>
                                                    <Text>Repos : {program.rest}</Text>
                                                    <Text>Conseil : {ex.advice}</Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text>Pas d'exercices disponibles</Text>
                    )}
                </View>
            </View>
        </View>
    </ScrollView>
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
      flexGrow: 1,
      flexDirection: "column",
  },
  box: {
      display: "flex",
      flexDirection: 'column',
      width: "100%",
      backgroundColor: "#B8B8FF",
      borderRadius: 10,
      marginVertical: 10,
      gap: 10
  },
  container_bienvenue: {
      marginTop: 100,
      marginLeft: 20,
  },
  contain_nav: {
      width: "100%",
      height: "10%",
      backgroundColor: "blue",
      flexDirection: "row",
      justifyContent: "space-around",
  },
  exoImg: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
  },
  boxTitle: {
      display: "flex",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      backgroundColor: "#9381FF",
      height: 50,
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  boxContent: {
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
  },
  exoContent: {
      display: "flex",
      flexDirection: 'column',
      marginLeft: 10,
      width: '65%',
      gap: 10,
  }
});

export default HomeScreen;