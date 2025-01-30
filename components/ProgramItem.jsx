import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProgramBox = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "45%", // ✅ 2 colonnes
    aspectRatio: 1, // ✅ Carré
    backgroundColor: "#B8B8FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ProgramBox;
