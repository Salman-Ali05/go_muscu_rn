import React, { useState, useEffect } from 'react';
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
import { useUser } from '../context/UserContext';

const PersonnalInfoScreen = () => {
    const navigation = useNavigation();
    const { user, setUser, token } = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Charger les informations de l'utilisateur
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setBirthDate(user.birthdate || '');
        }
    }, [user]);

    // Gestion du DateTimePickerModal
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        setBirthDate(formattedDate);
        hideDatePicker();
    };

    const handleSave = async () => {
        if (!name || !email || !birthDate) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires');
            return;
        }

        try {
            const updatedUserData = {
                name,
                email,
                birthdate: birthDate,
                ...(newPassword && { password: newPassword }), // Inclure le mot de passe seulement s'il est fourni
            };

            const response = await fetch(`https://go-muscu-api-seven.vercel.app/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(updatedUserData),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Récupérer les nouvelles données mises à jour depuis l'API
                const updatedUserResponse = await fetch(`https://go-muscu-api-seven.vercel.app/api/users/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });

                const updatedUser = await updatedUserResponse.json();

                if (updatedUserResponse.ok) {
                    setUser(updatedUser); // Mettre à jour le contexte avec les nouvelles données
                    Alert.alert('Succès', 'Vos informations ont été mises à jour avec succès !');
                    navigation.navigate('Profile');
                } else {
                    Alert.alert('Erreur', 'Erreur lors de la récupération des nouvelles données.');
                }
            } else {
                Alert.alert('Erreur', responseData.message || 'Une erreur est survenue lors de la mise à jour.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Problème de connexion.');
            console.error(error);
        }
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
                        {/* Champ Nom */}
                        <TextInput
                            placeholder="Nom"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={"#e6e7e7"}
                        />

                        {/* Champ Email */}
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholderTextColor={"#e6e7e7"}
                        />

                        {/* Champ Nouveau mot de passe */}
                        <TextInput
                            placeholder="Nouveau mot de passe"
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            placeholderTextColor={"#e6e7e7"}
                        />

                        {/* Champ Date de naissance */}
                        <TouchableOpacity onPress={showDatePicker}>
                            <View style={[styles.input, styles.dateInput]}>
                                <Text style={[styles.dateText, !birthDate && { color: "#e6e7e7" }]}>
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
        backgroundColor: '#B8B8FF',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#fff',
        justifyContent: 'center',
    },
    dateInput: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        justifyContent: 'center',
        backgroundColor: '#B8B8FF',
    },
    dateText: {
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
