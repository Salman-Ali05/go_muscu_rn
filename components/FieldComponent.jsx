import Icon from 'react-native-vector-icons/MaterialIcons'; // Import des icônes
import { View, TextInput, StyleSheet } from 'react-native';

export const FieldComponent = ({ iconName, value, onChangeText, placeholder, secureTextEntry, height = 60 }) => {

  return (
    <View style={[styles.inputContainer, { height }]}>   
      <Icon name={iconName} size={20} color="#e6e7e7" style={styles.icon} />   
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#e6e7e7"
      />
    </View>
  )
}


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8B8FF',
    borderRadius: 40,
    height: 60,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
});