import react from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Popup from '../components/popup'; 

const AccountSetupScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [kategori, setKategori] = useState('Vælg kategori'); // State for selected category
    const [frekvens, setFrekvens] = useState('Vælg frekvens'); // State for selected frequency
    const [showKategoriOptions, setShowKategoriOptions] = useState(false); // Toggle for category dropdown
    const [showFrekvensOptions, setShowFrekvensOptions] = useState(false); // Toggle for frequency dropdown
    const [navn, setNavn] = useState(''); // State for the "Navn" text field

    const kategoriOptions = ['Bolig', 'Hobby', 'Forsikring', 'Transport', 'Andet']; 
    const frekvensOptions = ['Ugentlig', 'Månedlig', 'Kvartal', 'Halvårlig', 'Årlig']; 

    return (
        <View style={styles.container}>
            <Popup
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title="Definition på rådighedsbeløb"
                message="Rådighedsbeløb er det beløb, du har tilbage efter skat og faste udgifter. Det er det beløb, du kan bruge til at spare op eller bruge på fornøjelser. Madbudgettet også indenunder rådighedsbeløb."
            />
            <View style={styles.containerBox}>
                <Text style={styles.textTitle}>Lad os sætte dit budget op.</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Definition på rådighedsbeløb</Text>
                </TouchableOpacity>
                <Text style={styles.textSmall}>Indtast dit rådighedsbeløb pr. måned: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="fx: 4200 kr"
                    placeholderTextColor="#bacfe3"
                    keyboardType="numeric"
                />
                <Text style={styles.textSmall}>Tilføj dine faste udgifter: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Navn"
                    placeholderTextColor="#bacfe3"
                    keyboardType='default'
                    value={navn} // Bind the state to the text input
                    onChangeText={setNavn} // Update the state when the text changes
                />
                
                {/* Kategori Dropdown */}
                <TouchableOpacity 
                    style={styles.dropdown} 
                    onPress={() => setShowKategoriOptions(!showKategoriOptions)}
                >
                    <Text style={styles.dropdownText}>{kategori}</Text>
                    <Image 
                        source={require('../../assets/down.png')} 
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {showKategoriOptions && (
                    <FlatList
                        data={kategoriOptions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.dropdownOption} 
                                onPress={() => {
                                    setKategori(item);
                                    setShowKategoriOptions(false);
                                }}
                            >
                                <Text style={styles.dropdownOptionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}

                {/* Frekvens Dropdown */}
                <TouchableOpacity 
                    style={styles.dropdown} 
                    onPress={() => setShowFrekvensOptions(!showFrekvensOptions)}
                >
                    <Text style={styles.dropdownText}>{frekvens}</Text>
                    <Image 
                        source={require('../../assets/down.png')} 
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {showFrekvensOptions && (
                    <FlatList
                        data={frekvensOptions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.dropdownOption} 
                                onPress={() => {
                                    setFrekvens(item);
                                    setShowFrekvensOptions(false);
                                }}
                            >
                                <Text style={styles.dropdownOptionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => {
                        setNavn(''); // Clear the "Navn" text field
                        setKategori('Vælg kategori'); // Reset the category dropdown
                        setFrekvens('Vælg frekvens'); // Reset the frequency dropdown
                    }}
                >
                    <Text style={styles.addButtonText}>Tilføj</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bacfe3',
    },
    containerBox: {
        flex: 'column',
        height: '75%',
        width: '80%',
        backgroundColor: 'red',
        marginBottom: '20%',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    textTitle: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '35%',
    },
    textSmall: {
        color: 'black',
        fontSize: 15,
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    textInput: {
        height: '6%',
        width: '80%',
        borderColor: '#1976D2',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
        paddingLeft: 10,
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: '#70a9e0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'light',
        textAlign: 'center',
    },
    dropdown: {
        height: 40,
        width: '80%',
        borderColor: '#1976D2',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', // Align text and icon horizontally
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    dropdownText: {
        color: 'black',
        fontSize: 15,
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        marginLeft: '10%',
        marginRight: '10%',
        width: '80%',
    },
    dropdownOptionText: {
        fontSize: 15,
        color: 'black',
    },
    icon: {
        width: 20,
        height: 20,
    },
    addButton: {
        backgroundColor: '#70a9e0',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start', 
        marginLeft: '10%',
        marginTop: '5%',
    },
    addButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'left',
    },
});

export default AccountSetupScreen;