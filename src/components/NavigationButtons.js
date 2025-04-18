import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationButtons = ({ currentScreen }) => {
  const navigation = useNavigation();

  const getButtonStyle = (screen) =>
    screen === currentScreen ? styles.blackButton : styles.blackButtonUnclicked;

  const getTextStyle = (screen) =>
    screen === currentScreen ? styles.blackButtonText : styles.blackButtonTextUnclicked;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piggy is happy to see you!</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={getButtonStyle('PigScreen')}
          onPress={() => navigation.navigate('PigScreen')}
        >
          <Text style={getTextStyle('PigScreen')}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('PigChallengeScreen')}
          onPress={() => navigation.navigate('PigChallengeScreen')}
        >
          <Text style={getTextStyle('PigChallengeScreen')}>Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('PigShopScreen')}
          onPress={() => navigation.navigate('PigShopScreen')}
        >
          <Text style={getTextStyle('PigShopScreen')}>Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 32,
    marginTop: '10%',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
    width: '90%',
  },
  blackButton: {
    flex: 'row',
    backgroundColor: 'black',
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButtonUnclicked: {
    flex: 'row',
    backgroundColor: 'white',
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  blackButtonText: {
    fontSize: 20,
    color: 'white',
  },
  blackButtonTextUnclicked: {
    fontSize: 20,
    color: 'black',
  },
});

export default NavigationButtons;
