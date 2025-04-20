import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import NavigationButtons from '../components/NavigationButtons';

const ChallengeButton = ({ text, leftIconSource, rightIconSource }) => (
  <TouchableOpacity style={styles.challengeButton}>
    <Image style={styles.challengeIcon} source={leftIconSource} />
    <Text style={styles.challengeButtonText}>{text}</Text>
    <Image style={styles.challengeIcon} source={rightIconSource} />
  </TouchableOpacity>
);

const buttonData = [
  { text: 'Groceries +20', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Fitness +30', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Study +25', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  // Add more buttons as needed
];

const PigChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigChallengeScreen" />
      <Text style={styles.textExplanation}>
        Increase the difficulty of your challenge by adding more categories and in turn receieve more BaconBucks!
      </Text>
      <View style={styles.challengeContainer}>
        {buttonData.map((button, index) => (
          <ChallengeButton
            key={index}
            text={button.text}
            leftIconSource={button.leftIconSource}
            rightIconSource={button.rightIconSource}
          />
        ))}
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: '40%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  challengeButton: {
    flexDirection: 'row',
    backgroundColor: '#E97171',
    width: '80%',
    height: '13%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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