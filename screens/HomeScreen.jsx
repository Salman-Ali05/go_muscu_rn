import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, token } = useUser();
    const [program, setProgram] = useState(null);
    const [expanded, setExpanded] = useState({});

    const id = user?.programID;

    const toggleExpand = (exerciseId) => {
        setExpanded((prev) => ({
            ...prev,
            [exerciseId]: !prev[exerciseId],
        }));
    };

    const imageMap = {
        'triceps_skull.jpg': require('../assets/triceps_skull.jpg'),
        'jambes_squat.jpg': require('../assets/jambes_squat.jpg'),
        'epaules_dev.jpg': require('../assets/epaules_dev.jpg'),
        'dos_tractions.jpg': require('../assets/dos_tractions.jpg'),
        'dos_rowing.jpg': require('../assets/dos_rowing.jpg'),
        'pect_coucher.jpg': require('../assets/pect_coucher.jpg'),
        'jambes_mollets.jpg': require('../assets/jambes_mollets.jpg'),
        'triceps_poulie.jpg': require('../assets/triceps_poulie.jpg'),
        'bicep_hammer.jpg': require('../assets/bicep_hammer.jpg'),
        'epaules_lateral.jpg': require('../assets/epaules_lateral.jpg'),
    };

    async function fetchProgram() {
        if (!id) {
            return;
        } else {
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

    }

    useEffect(() => {
        fetchProgram();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Accueil</Text>
                </View>
                <TouchableOpacity style={styles.photo} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="account-circle" size={50} color="#B8B8FF" />
                </TouchableOpacity>
            </View>

            <View style={styles.container_bienvenue}>
                <Text>Bonjour {user?.name}</Text>
                <Text>Projet : {program?.name || "Aucun programme assigné"}</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                <View style={styles.container_for_program}>
                    <View style={styles.container_program}>
                        <View style={styles.grid}>
                            {program?.exercises?.length > 0 ? (
                                program.exercises.map((ex) => {
                                    const exoId = ex._id;
                                    const imageSource = imageMap[ex.image];

                                    return (
                                        <TouchableOpacity key={exoId} onPress={() => toggleExpand(exoId)}>
                                            <View style={styles.box}>
                                                <View style={styles.boxTitle}>
                                                    <Text>{ex.name}</Text>
                                                    <Icon name={expanded[exoId] ? 'chevron-up' : 'chevron-down'} size={24} />
                                                </View>

                                                {expanded[exoId] && (
                                                    <View style={styles.boxContent}>
                                                        <Image source={imageSource} style={styles.exoImg} />
                                                        <View style={styles.exoContent}>
                                                            <Text>Séries : 4</Text>
                                                            <Text>Répétitions : {ex.nbRep || "N/A"}</Text>
                                                            <Text>Repos : {ex.rest || "N/A"}</Text>
                                                            <Text>Conseil : {ex.advice || "Aucun conseil"}</Text>
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
        flexDirection: "row",
        justifyContent: "space-between",
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
        alignItems: "center",
    },
    container_bienvenue: {
        marginTop: 100,
        marginLeft: 20,
    },
    container_for_program: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    container_program: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "20%",
    },
    grid: {
        width: "90%",
        flexGrow: 1,
        flexDirection: "column",
    },
    box: {
        flexDirection: 'column',
        width: "100%",
        backgroundColor: "#B8B8FF",
        borderRadius: 10,
        marginVertical: 10,
        gap: 10,
    },
    boxTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: "#9381FF",
        height: 50,
    },
    boxContent: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 10,
    },
    exoImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    exoContent: {
        flexDirection: 'column',
        marginLeft: 10,
        width: '65%',
        gap: 10,
    },
});

export default HomeScreen;