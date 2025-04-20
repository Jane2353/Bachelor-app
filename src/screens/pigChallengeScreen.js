import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import NavigationButtons from '../components/NavigationButtons';

const ChallengeButton = ({ text, leftIconSource, rightIconSource, points, isClicked, onPress }) => (
  <TouchableOpacity
    style={[styles.challengeButton, { backgroundColor: isClicked ? '#E97171' : 'grey' }]}
    onPress={onPress}
  >
    <Image style={styles.challengeIcon} source={leftIconSource} />
    <Text style={styles.challengeButtonText}>{text}</Text>
    <Text style={styles.challengeButtonText}>{points}</Text>
    <Image style={styles.challengeIcon} source={rightIconSource} />
  </TouchableOpacity>
);

const buttonData = [
  { text: 'Groceries', points: '+30', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+10', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+10', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+20', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+50', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+50', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+50', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+20', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+20', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
  { text: 'Groceries', points: '+20', leftIconSource: require('../../assets/user.png'), rightIconSource: require('../../assets/user.png') },
];

const PigChallengeScreen = () => {
  const [clickedButtons, setClickedButtons] = useState(Array(buttonData.length).fill(false));

  const handleButtonPress = (index) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[index] = !updatedClickedButtons[index];
    setClickedButtons(updatedClickedButtons);
  };

  const calculateBaconBucks = () => {
    return buttonData.reduce((total, button, index) => {
      if (clickedButtons[index]) {
        const points = parseInt(button.points.replace('+', ''), 10); // Extract numeric value from points
        return total + points;
      }
      return total;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigChallengeScreen" />
      <Text style={styles.textExplanation}>
        Increase the difficulty of your challenge by adding more categories and in turn receieve more BaconBucks!
      </Text>
      <View style={styles.challengeContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
          {buttonData.map((button, index) => (
            <ChallengeButton
              key={index}
              text={button.text}
              points={button.points}
              leftIconSource={button.leftIconSource}
              rightIconSource={button.rightIconSource}
              isClicked={clickedButtons[index]}
              onPress={() => handleButtonPress(index)}
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.textExplanation2}>
        You have selected {clickedButtons.filter((clicked) => clicked).length} categories.
        {'\n'}You will receive {calculateBaconBucks()} BaconBucks.
      </Text>
      <TouchableOpacity style={styles.confirmButton} onPress={() => alert('Challenge has now been accepted!')}>
        <Text style={styles.challengeButtonText}>Accept challenge</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    colour: 'black',
    width: '90%',
    textAlign: 'center',
  },
  textExplanation2: {
    marginTop: '5%',
    fontSize: 18,
    colour: 'black',
    width: '90%',
    textAlign: 'center',
  },
  challengeContainer: {
    marginTop: '5%',
    width: '80%',
    height: '35%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    overflow: 'hidden', // Ensures content stays within the container
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  challengeButton: {
    flexDirection: 'row',
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
  confirmButton: {
    backgroundColor: '#E97171',
    borderRadius: 20,
    marginTop: 10,
    width: '50%',
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  confirmButtonText: {
    fontSize: 20,
    color: 'black',
  },
});

export default PigChallengeScreen;