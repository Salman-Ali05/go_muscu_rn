import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.contain_nav}>
            <View style={styles.target_icon}>
                <Image source={require('../assets/target.png')} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.home_icon} onPress={() => navigation.navigate('Home')}>
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
    },

    image: {
        width: 40,
        height: 40
    }
});

export default Navbar;
