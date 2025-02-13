import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const ProfileScreen = () => {
    const { user, token } = useUser();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

    const navigation = useNavigation();
    const id = user?.programID;

    async function fetchProgram() {
        if (!id) return;

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
        } finally {
            setLoading(false); // Arrêter le chargement après la requête
        }
    }

    useEffect(() => {
        fetchProgram();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Profil</Text>
                    {loading ? (
                        <ActivityIndicator size="small" color="#B8B8FF" />
                    ) : (
                        <Text>{program ? program.name : "Aucun programme assigné"}</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.photo}>
                    <Icon name="account-circle" size={50} color="#B8B8FF" />
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Image style={styles.profileImage} />
                <Text style={styles.userName}>Bonjour {user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <View style={styles.stats}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>27kg</Text>
                    <Text style={styles.statLabel}>Dernière perf : Biceps curl</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('PersonnalInfo')}>
                    <Text style={styles.actionText}>Modifier Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Voir Statistiques</Text>
                </TouchableOpacity>
            </View>

            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FF',
    },
    header: {
        height: "30%",
        width: "100%",
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        height: "80%",
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#414144',
    },
    photo: {
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    userInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#414144',
    },
    userEmail: {
        fontSize: 16,
        color: '#6B6B6B',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#9381FF',
    },
    statLabel: {
        fontSize: 14,
        color: '#6B6B6B',
    },
    actions: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    actionButton: {
        backgroundColor: '#B8B8FF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    actionText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
