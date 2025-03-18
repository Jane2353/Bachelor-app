import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FrontScreen = ({ navigation }) => { // Add navigation prop
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Front Screen!</Text>
      <TouchableOpacity style={styles.buttonCont} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF', 
  },
  buttonCont: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FrontScreen;