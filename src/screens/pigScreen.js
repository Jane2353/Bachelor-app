import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Popup from '../components/popup';

const PigScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Piggy is happy to see you!</Text>
    <View style={styles.containerButtons}>
      <TouchableOpacity style={styles.blackButton}>Home</TouchableOpacity>
      <TouchableOpacity style={styles.blackButtonUnclicked}>Challenge</TouchableOpacity>
      <TouchableOpacity style={styles.blackButtonUnclicked}>Shop</TouchableOpacity>
    </View>
    <View style={styles.containerMeter}></View>
    <Image style={styles.pigIcon} source={require('../../assets/Pig/side_happy.png')}></Image>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
  Title: {
    marginTop: '10%',
    fontSize: 32,
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
  containerMeter: {
    marginTop: '5%',
    width: '90%',
    height: '10%',
    backgroundColor: 'grey',
  },
  pigIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }
});

export default PigScreen;