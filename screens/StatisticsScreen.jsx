import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { useUser } from "../context/UserContext";

const StatisticsScreen = () => {
    const { user, token } = useUser(); // ✅ Vérifié : `useUser()` retourne un objet

    const [exercicesList, setExercicesList] = useState([]); // Liste des exercices depuis l'API
    const [exercice, setExercice] = useState(""); // Exercice sélectionné
    const [maxKg, setMaxKg] = useState("");
    const [nbRep, setNbRep] = useState("");
    const [modalVisible, setModalVisible] = useState(false); // Contrôle de l'affichage de la Modal

    const API_URL = "https://go-muscu-api-seven.vercel.app/api/exercises";

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchExercices = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Impossible de récupérer les exercices");
                }

                const data = await response.json(); //  Attendre la conversion JSON
                setExercicesList(data); //  Met à jour correctement la liste
                console.log("Exercices récupérés :", data[0]); // Debug
            } catch (error) {
                Alert.alert("Erreur", "Impossible de récupérer les exercices.");
                console.error("Erreur API :", error);
            }
        };

        fetchExercices();
    }, [user]); // ✅ Dépendance correcte

    const handleSubmit = () => {
        console.log({ exercice, maxKg, nbRep });
        if(!exercice || !maxKg || !nbRep){
            Alert.alert('Erreur', 'Tous les champs ne sont pas remplis')
        }

        if(isNaN(nbRep) || nbRep <= 0){
            Alert.alert('Erreur', 'Le nombre de répétition doit-être valide')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enregistrer une Performance</Text>

            {/*  Input pour Exercice (Ouvre la modal) */}
            <Text style={styles.label}>Exercice</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.inputText}>
                    {exercice ? exercice : "Sélectionner un exercice"}
                </Text>
            </TouchableOpacity>

            {/* Modal avec la liste des exercices */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={exercicesList}
                            key={(item) => item.id?.toString()} // ✅ Vérifiez que `id` existe
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        setExercice(item.name); // ✅ Vérifiez que `nom` existe
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Bouton pour fermer la modal */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Champ Max Kg */}
            <TextInput
                style={styles.input}
                placeholder="Max soulevé (kg)"
                keyboardType="numeric"
                value={maxKg}
                onChangeText={setMaxKg}
            />

            {/* Champ Nb Rep */}
            <TextInput
                style={styles.input}
                placeholder="Nombre de répétitions"
                keyboardType="numeric"
                value={nbRep}
                onChangeText={setNbRep}
            />

            {/* Bouton de soumission */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    );
};

// ✅ Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        width: "80%",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#B8B8FF",
        marginBottom: 10,
    },
    inputText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: "#B8B8FF",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#B8B8FF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default StatisticsScreen;
