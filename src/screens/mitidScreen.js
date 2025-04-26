import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MitidScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Icon and Title */}
      <Image 
        style={styles.icon} 
        source={require('../../assets/Pig/front_smile_transparent.png')} 
      />
      <Text style={styles.title}>
        The Piggy <Text style={styles.highlight}>Bank</Text>
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Enter the financial world of the piggy bank.
      </Text>
      <Text style={styles.subDescription}>
        Welcome to the piggy bank application, with the implementation of gamification you can manage and improve your finances.
      </Text>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("choosePigScreen")} // Updated navigation target
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: '40%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: '20%',
  },
  highlight: {
    color: '#2ECC71', // Green color for "Bank"
  },
  description: {
    fontSize: 25,
    color: '#E97171', // Red color for the main description
    marginTop: 20,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
  subDescription: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
    lineHeight: 25,
    paddingHorizontal: '5%',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: '20%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A8E6CF',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2ECC71', // Green color for the active dot
  },
  button: {
    backgroundColor: '#2ECC71', // Green button
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 25,
    position: 'absolute', // Use absolute positioning
    bottom: 50, // Place the button 50 pixels from the bottom
    alignSelf: 'center', // Center horizontally
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, // Match font size with choosePigScreen
    fontWeight: 'bold',
  },
});

export default MitidScreen;

