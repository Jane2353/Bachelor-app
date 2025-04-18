import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piggy is happy to see you!</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.blackButton} onPress={() => navigation.navigate('PigScreen')}>
          <Text style={styles.blackButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blackButtonUnclicked} onPress={() => navigation.navigate('PigChallengeScreen')}>
          <Text style={styles.blackButtonTextUnclicked}>Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blackButtonUnclicked} onPress={() => navigation.navigate('PigShopScreen')}>
          <Text style={styles.blackButtonTextUnclicked}>Shop</Text>
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
    fontSize: 32, // Match original size
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
    fontSize: 20,
    color: 'white',
  },
  blackButtonUnclicked: {
    flex: 'row',
    backgroundColor: 'white',
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'black',
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
