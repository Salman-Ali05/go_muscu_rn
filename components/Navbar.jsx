import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes

const Navbar = () => {
    return(

        <View style={styles.contain_nav}>
            <View style={styles.target_icon}>
                <Image source={require('../assets/target.png')} style={styles.image}/>
            </View>
            <View style={styles.home_icon}>  
                <Image source={require('../assets/home.png')} style={styles.image} />
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    contain_nav: {
        width:"100%",
        height: "10%",
        // backgroundColor:"blue",
        flexDirection: "row",
        justifyContent: "space-around"
      },

      image:{
        width:40,
        height:40
      }
})

export default Navbar;