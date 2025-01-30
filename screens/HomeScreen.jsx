import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeScreen = () => {

    const programs = [1,2,3,4];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Acceuil</Text>
            </View>
            <View style={styles.photo}>
            <Icon name="account-circle" size={50} color="#B8B8FF" />
            </View>
        </View>
        
        <View style={styles.container_bienvenue}>
            <Text>Bonjour Ianis</Text>
            <Text>Projet : Prise de masse</Text>
        </View>

        <View style={styles.container_for_program}>
            <View style={styles.container_program}>
                    <View style={styles.grid}>
                        {programs.map((item, index) => (
                            <View key={index} style={styles.box}>
                                <Text>{`Box ${item}`}</Text>
                            </View>
                        ))}
                    </View>
            </View>
        </View>

        <View style={styles.contain_nav}>
            <View style={styles.target_icon}>
                <Icon name="target" size={50} color="#1c2833" />
            </View>
            <View style={styles.home_icon}>  
                 <Icon name="home" size={50} color="#1c2833" />  
            </View>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor: "red"
    },
    
    header:{
        height:"10%",
        width:"100%",
        // backgroundColor:"blue",
        marginTop:"30%",
        flexWrap: "wrap",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    titleText:{
        fontSize: 40,
    },
    title:{
        height:"80%",
        width:"50%",
        // backgroundColor:"yellow",
        marginLeft: 20,
    },
    photo:{
        height:"80%",
        width:"30%",
        // backgroundColor:"brown",
        alignItems:"center"
    },

    container_for_program:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },

    container_program:{
        height:"70%",
        width:"100%",
        // backgroundColor:"blue",
        alignItems:'center',
        justifyContent:'center',
        marginBottom: "20%"
    },

    grid: {
        width: "90%", // Largeur totale de la grille (ajustable)
        height: "60%",
        flexDirection: "row", // Alignement en ligne
        flexWrap: "wrap", // Retour à la ligne pour 2 colonnes
        justifyContent: "space-between", // Espace uniforme entre les colonnes
        // backgroundColor:"red",
      },
      box: {
        width: "45%", // Largeur de chaque boîte (ajustée pour 2 colonnes)
        height:"50%",
        backgroundColor: "#B8B8FF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10, // Coins arrondis
        marginVertical: 10, // Espacement vertical entre les lignes
     
      },

      container_bienvenue:{
        marginLeft: 20
      },

      contain_nav: {
        width:"100%",
        height: "10%",
        // backgroundColor:"blue",
        flexDirection: "row",
        justifyContent: "space-around"
      }
});

export default HomeScreen;
