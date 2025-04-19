import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import NavigationButtons from '../components/NavigationButtons';

const PigChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigChallengeScreen" />
      <Text style={styles.textExplanation}>
        Increase the difficulty of your challenge by adding more categories and in turn receieve more BaconBucks!
      </Text>
      <View style={styles.challengeContainer}>
        <TouchableOpacity style={styles.challengeButton}>
          <Image style={styles.challengeIcon} source={require('../../assets/user.png')} />
          <Text style={styles.challengeButtonText}>Clothes +15</Text>
          <Image style={styles.challengeIcon} source={require('../../assets/user.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.challengeButton}>
          <Image style={styles.challengeIcon} source={require('../../assets/user.png')} />
          <Text style={styles.challengeButtonText}>Groceries +20</Text>
          <Image style={styles.challengeIcon} source={require('../../assets/user.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textExplanation: {
    marginTop: '10%',
    fontSize: 20,
    colour: 'black',
    width: '90%',
    textAlign: 'center',
  },
  challengeContainer: {
    marginTop: '5%',
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center',
    width: '80%',
    height: '40%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  challengeButton: {
    flexDirection: 'row', // Align icon and text horizontally
    backgroundColor: '#E97171',
    width: '80%',
    height: '13%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between', // Space between icon and text
    paddingHorizontal: 20, // Add padding inside the button
  },
  challengeButtonText: {
    fontSize: 20,
    color: 'black',
  },
  challengeIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});

export default PigChallengeScreen;
