import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';

const PersonnalInfoScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Logique DatePicker
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        setBirthDate(formattedDate);
        hideDatePicker();
    };

    const handleSave = () => {
        if (!email || !oldPassword || !newPassword || !birthDate) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires');
            return;
        }
        Alert.alert(email, oldPassword, newPassword, birthDate);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.titleText}>Modifier vos Informations</Text>
                    </View>

                    <View style={styles.form}>
                        {/* Champ Email */}
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                        />

                        {/* Champ Ancien mot de passe */}
                        <TextInput
                            placeholder="Ancien mot de passe"
                            style={styles.input}
                            value={oldPassword}
                            onChangeText={(text) => setOldPassword(text)}
                            secureTextEntry
                        />

                        {/* Champ Nouveau mot de passe */}
                        <TextInput
                            placeholder="Nouveau mot de passe"
                            style={styles.input}
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry
                        />

                        {/* Champ Date de naissance */}
                        <TouchableOpacity onPress={showDatePicker}>
                            <View style={[styles.input, styles.dateInput]}>
                                <Text style={styles.dateText}>
                                    {birthDate || "Date de naissance (JJ/MM/AAAA)"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Modale DatePicker */}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                        {/* Bouton Sauvegarder */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Sauvegarder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.returnButton}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text style={styles.returnButtonText}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Navbar fixée en bas */}
            <Navbar />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FF',
    },
    header: {
        height: "15%",
        width: "100%",
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#414144',
    },
    form: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
    },
    dateInput: {
        height: 50,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        justifyContent: 'center',
    },
    dateText: {
        color: '#9e9e9e',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#B8B8FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    returnButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B8B8FF',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    returnButtonText: {
        color: '#B8B8FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PersonnalInfoScreen;
