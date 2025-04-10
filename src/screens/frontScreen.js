import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Popup from '../components/popup';

const FrontScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <View style={styles.carContainer}>
        <Image style={styles.carIcon} source={require('../../assets/Car/Car.png')} />
      </View>
      <View style={styles.carFuelContainer}>
        <Image style={styles.carFuelIcon} source={require('../../assets/Car/Fuel.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    marginTop: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carIcon: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  carFuelContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'baseline',
  },
  carFuelIcon: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
  carFuelText: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default FrontScreen;