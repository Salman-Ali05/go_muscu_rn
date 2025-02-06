import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();

    const nextHome = () => {
        navigation.navigate("Home");
    }

    const nextStats = () => {
        navigation.navigate("Statistics");
    }
    return (
        <View style={styles.contain_nav}>
            <TouchableOpacity style={styles.target_icon} onPress={nextStats}>
                <Image source={require('../assets/target.png')} style={styles.image}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.home_icon} onPress={nextHome}>
                <Image source={require('../assets/home.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contain_nav: {
        width: "100%",
        height: 60, // Hauteur fixe pour la navbar
        position: "absolute",
        bottom: 0, // Toujours en bas
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", // Centrer verticalement les icônes
        backgroundColor: "#fff",
    },

    image: {
        width: 40,
        height: 40
    }
});

export default Navbar;
