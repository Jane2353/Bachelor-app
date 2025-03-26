import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import FrontScreen from './frontScreen.js';

const MitidScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');

  return(
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Log på med MitID </Text>
        <Image 
        style={styles.mitidIcon} 
        source={require('../../assets/mitid.png')} />
      </View>

      <View style={styles.line}>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>BRUGER-ID</Text>
        <TextInput 
          style={styles.textInput} 
          value={userId} 
          onChangeText={setUserId}
        />
      </View>

      <TouchableOpacity 
        style={[styles.buttonCont, { backgroundColor: userId ? '#007AFF' : '#c8c8c8' }]} 
        // Conditional rendering of button. Background colour of the button is blue if userId is not empty, otherwise it's set to grey.
        onPress={() => userId && navigation.navigate("Front")} 
        // When pressing button, navigate to FrontScreen if userId is not empty.
        disabled={!userId} 
        // Disables prop if userId is empty.
      >
        <Text style={styles.buttonText}>FORTSÆT</Text>
        <Image 
        style={styles.buttonIcon} 
        source={require('../../assets/right-arrow.png')} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  /* Main container code */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Text container */
  inputContainer: { 
    width: '70%',
    paddingBottom: 10,
  },

  /* Log på MitID code */
  titleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '70%',  
    flexDirection: 'row',
  },
  textTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mitidIcon: {
  width: 50, 
  height: 40,
  resizeMode: 'contain',
  },

  /* Line code */
  line: {
    width: '70%', 
    height: 1,     
    backgroundColor: '#c8c8c8',
    marginBottom: 50
  },

  /* BRUGER-ID */
  text: {
    color: '#383838',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },

  /* Text input code */
  textInput: {
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 15,
  },

  /* Button code */
  buttonCont: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 1,
    height: 55,
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  buttonIcon: {
    tintColor: 'white',
    width: 30,
    height: 40,
    resizeMode: 'contain',
  }
});

export default MitidScreen;

