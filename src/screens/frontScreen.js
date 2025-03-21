import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Popup from '../components/popup';

const FrontScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Front Screen!</Text>
      <TouchableOpacity style={styles.buttonCont} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
      <Popup 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible}
      title="Congratulations"
      message="You have earned a new badge"
      imageSource={require('../../assets/badge.png')} 
      />
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