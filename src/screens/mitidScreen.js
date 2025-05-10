import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import NextButtonWithDots from "../components/NextButtonWithDots";

const MitidScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon and Title */}
        <Image
          style={styles.icon}
          source={require("../../assets/Pig/front_smile_transparent.png")}
        />
        <Text style={styles.title}>
          The Piggy <Text style={styles.highlight}>Bank</Text>
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Enter the financial world of the piggy bank.
        </Text>
        <Text style={styles.subDescription}>
          Welcome to the piggy bank application, with the implementation of
          gamification you can manage and improve your finances.
        </Text>
      </View>
      <NextButtonWithDots
        navigation={navigation}
        nextScreen="choosePigScreen"
        activeDotIndex={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // Ensures consistent spacing
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  icon: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginTop: "40%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: "20%",
  },
  highlight: {
    color: "#2ECC71",
  },
  description: {
    fontSize: 25,
    color: "#E97171",
    marginTop: 20,
    fontWeight: "bold",
    paddingHorizontal: "5%",
  },
  subDescription: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    lineHeight: 25,
    paddingHorizontal: "5%",
  },
});

export default MitidScreen;
