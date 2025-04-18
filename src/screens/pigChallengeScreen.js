import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationButtons from '../components/NavigationButtons';

const PigChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Pig Challenge!</Text>
      <NavigationButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PigChallengeScreen;
