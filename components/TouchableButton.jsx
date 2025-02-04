import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TouchableButton = ({ onPress, iconName }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Icon name={iconName} size={30} color="#e6e7e7" style={styles.icon} onPress={onPress}/>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#B8B8FF',
    height: 70, 
    width: 70,
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
});