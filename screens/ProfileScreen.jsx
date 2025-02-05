import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Profil</Text>
                    <Text>Prise de masse</Text>
                </View>
                <TouchableOpacity style={styles.photo}>
                    <Icon name="account-circle" size={50} color="#B8B8FF" />
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Image style={styles.profileImage} />
                <Text style={styles.userName}>Bonjour, Ianis</Text>
                <Text style={styles.userEmail}>ianis@example.com</Text>
            </View>

            <View style={styles.stats}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>27kg</Text>
                    <Text style={styles.statLabel}>Denière perf : Biceps curl</Text>
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
