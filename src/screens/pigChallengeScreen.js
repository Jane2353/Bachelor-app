import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import NavigationButtons from "../components/NavigationButtons";

const ChallengeButton = ({
  text,
  leftIconSource,
  rightIconSource,
  points,
  isClicked,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.challengeButton,
      { backgroundColor: isClicked ? "#E97171" : "grey" },
    ]}
    onPress={onPress}
  >
    <Image style={styles.challengeIcon} source={leftIconSource} />
    <Text style={styles.challengeButtonText}>{text}</Text>
    <Text style={styles.challengeButtonText}>{points}</Text>
    <Image style={styles.challengeIcon} source={rightIconSource} />
  </TouchableOpacity>
);

const buttonData = [
  {
    text: "Groceries",
    points: "+30",
    leftIconSource: require("../../assets/user.png"),
    rightIconSource: require("../../assets/bacon.png"),
  },
  {
    text: "Shopping",
    points: "+10",
    leftIconSource: require("../../assets/user.png"),
    rightIconSource: require("../../assets/bacon.png"),
  },
  {
    text: "Hobby",
    points: "+10",
    leftIconSource: require("../../assets/user.png"),
    rightIconSource: require("../../assets/bacon.png"),
  },
  {
    text: "Leisure",
    points: "+20",
    leftIconSource: require("../../assets/user.png"),
    rightIconSource: require("../../assets/bacon.png"),
  },
  {
    text: "Health",
    points: "+50",
    leftIconSource: require("../../assets/user.png"),
    rightIconSource: require("../../assets/bacon.png"),
  },
];

const PigChallengeScreen = () => {
  const [clickedButtons, setClickedButtons] = useState(
    Array(buttonData.length).fill(false)
  );
  const [isChallengeAccepted, setIsChallengeAccepted] = useState(false); // New state

  const handleButtonPress = (index) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[index] = !updatedClickedButtons[index];
    setClickedButtons(updatedClickedButtons);
  };

  const calculateBaconBucks = () => {
    return buttonData.reduce((total, button, index) => {
      if (clickedButtons[index]) {
        const points = parseInt(button.points.replace("+", ""), 10); // Extract numeric value from points
        return total + points;
      }
      return total;
    }, 0);
  };

  const handleAcceptChallenge = () => {
    setIsChallengeAccepted(true); // Mark challenge as accepted
    alert("Challenge has now been accepted!");
  };

  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigChallengeScreen" />
      <Text style={styles.textExplanation}>
        Increase the difficulty of your challenge by adding more categories and
        in turn receieve more BaconBucks! Complete the challenge by spending no
        money in the selected categorie for a certain time period.
      </Text>
      <View style={styles.challengeContainer}>
        {isChallengeAccepted ? (
          <>
            <Text style={styles.textAfterAccept}>
              You have already accepted a challenge: Spend no money on{" "}
              {buttonData
                .filter((_, index) => clickedButtons[index])
                .map((button) => button.text)
                .join(", ")}
              .
            </Text>
            <Text style={styles.textAfterAccept}>
              You will receive {calculateBaconBucks()} BaconBucks.
            </Text>
          </>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            nestedScrollEnabled={true}
          >
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
        )}
      </View>
      {!isChallengeAccepted && (
        <>
          <Text style={styles.textExplanation2}>
            You have selected{" "}
            {clickedButtons.filter((clicked) => clicked).length} categories.
            {"\n"}You will receive {calculateBaconBucks()} BaconBucks.
          </Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleAcceptChallenge}
          >
            <Text style={styles.challengeButtonText}>Accept challenge</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textExplanation: {
    marginTop: "5%",
    fontSize: 16,
    colour: "black",
    width: "80%",
  },
  textExplanation2: {
    marginTop: "5%",
    fontSize: 16,
    colour: "black",
    width: "80%",
    textAlign: "center",
  },
  textAfterAccept: {
    marginTop: "5%",
    fontSize: 16,
    colour: "black",
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
  },
  challengeContainer: {
    marginTop: "5%",
    width: "80%",
    height: "35%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  challengeButton: {
    flexDirection: "row",
    width: "80%",
    height: "13%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  challengeButtonText: {
    fontSize: 20,
    color: "black",
  },
  challengeIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  confirmButton: {
    backgroundColor: "#E97171",
    borderRadius: 20,
    marginTop: 10,
    width: "50%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 20,
    color: "black",
  },
});

export default PigChallengeScreen;
