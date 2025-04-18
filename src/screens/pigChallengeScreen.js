import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationButtons from '../components/NavigationButtons';

const PigChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigChallengeScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default PigChallengeScreen;
