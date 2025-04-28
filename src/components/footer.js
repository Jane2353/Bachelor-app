import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      {/* Left icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image style={styles.icon} source={require('../../assets/user.png')} />
      </TouchableOpacity>

      {/* Floating pig icon in diamond */}
      <View style={styles.centerIconWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('PigScreen')}>
          <View style={styles.diamond}>
            <Image style={styles.pigIcon} source={require('../../assets/pigIcon.png')} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Right icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Overview')}>
        <Image style={styles.icon} source={require('../../assets/statistics.png')} />
      </TouchableOpacity>
    </View>
  );
};

export const ConditionalFooter = () => {
  const state = useNavigationState((state) => state);
  if (!state) return null;

  const currentRouteName = state.routes[state.index].name;
  if (currentRouteName === 'Login' || currentRouteName === 'choosePigScreen' || currentRouteName === 'ExpensesScreen') return null; 

  return <Footer />;
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#FFB2B2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1,
    gap: 110,
    borderWidth: 1,
    borderColor: 'black',
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  centerIconWrapper: {
    position: 'absolute',
    top: -35,
    left: '50%',
    transform: [{ translateX: -35 }], // Remove this and it'll work on the phone
    zIndex: 2,
  },
  diamond: {
    width: 70,   // ← was 60
    height: 70,  // ← was 60
    backgroundColor: '#EB9999',
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'black',
},
  pigIcon: {
    width: 40,   // ← was 30
    height: 40,  // ← was 30
    resizeMode: 'contain',
    tintColor: 'black',
    transform: [{ rotate: '-45deg' }],
},

});

export default Footer;
