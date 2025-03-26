import React, { use } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Front')}>
            <Image style={styles.icon} source={require('../../assets/home.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image style={styles.icon} source={require('../../assets/user.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image style={styles.icon} source={require('../../assets/plus.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
            <Image style={styles.icon} source={require('../../assets/statistics.png')} />
          </TouchableOpacity>
        </View>
      );
    };

export const ConditionalFooter = () => {
  const state = useNavigationState(state => state);
  // uses the useNavigationState hook to get the current state of the navigation stack.
  // The state object contains the current route and the current index of the navigation stack.
  if (!state) {
    return null;
  }
  const currentRouteName = state.routes[state.index].name;
  // The currentRouteName is the name of the current route.

  if (currentRouteName === 'Login') {
    return null;
  }
  // If the current route is the Login screen, the footer is not rendered.

  return <Footer />;
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        width: '100%',
        backgroundColor: '#1976D2',
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    text: {
        color: 'black',
        fontSize: 24,
    },
    icon: {
        width: 40,
        maxWidth: '100%', 
        height: 40,
        resizeMode: 'contain',
        tintColor: 'white',
    }

});

export default Footer;