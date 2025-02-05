import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ProgramCard = ({ id, name, image, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      key={id}
      style={[styles.programBox, isSelected && styles.selectedProgram]}
      onPress={() => onSelect(id)}
    >
      <Image source={image} style={styles.programImage} />
      <Text style={styles.programText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  programBox: {
    width: '45%',
    height: '50%',
    backgroundColor: '#B8B8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  selectedProgram: {
    backgroundColor: '#4CAF50',
    borderColor: '#FFF',
    borderWidth: 2,
  },
  programImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  programText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default ProgramCard;
