import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RegisterProgramScreen = ({ navigation }) => {

  const programs = [{
    id: 1,
    key: 'pdm',
    name: 'Prise de masse',
    img: require('../assets/pdm.png')
  }, {
    id: 2,
    key: 'force',
    name: 'Force',
    img: require('../assets/force.png')
  }, {
    id: 3,
    key: 'cardio',
    name: 'Cardio',
    img: require('../assets/cardio.png')
  }, {
    id: 4,
    key: 'sw',
    name: 'StreetWorkout',
    img: require('../assets/st.png')
  }];

  const handleHomeRedirection = () => {
    navigation.navigate('Home');
  }

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
              <TouchableOpacity style={styles.box} onPress={handleHomeRedirection}>
                <View key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    marginBottom: 10,
                    fontWeight: 600
                  }}>{item?.name}</Text>
                  <Image source={item?.img} style={{ width: 80, height: 80 }} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Icon name="login" size={30} color="#e6e7e7" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: '400',
    color: '#B8B8FF',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row', // Place les icônes et les champs côte à côte
    alignItems: 'center',
    backgroundColor: '#B8B8FF', // Couleur de fond
    borderRadius: 40, // Arrondi
    height: 70,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  title2: {
    fontSize: 64,
    fontWeight: '400',
    color: '#414144',
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
    flex: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    backgroundColor: '#B8B8FF', // Couleur de fond
    height: 70, 
    width: 70, 
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: '400',
    color: '#B8B8FF',
    marginTop: 30,
  },
  title2: {
    fontSize: 64,
    fontWeight: '400',
    color: '#414144',
  },
  contain_nav: {
    width:"100%",
    height: "10%",
    // backgroundColor:"blue",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  }
});

export default RegisterProgramScreen;
