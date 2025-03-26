import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../../assets/user.png')} />
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
  icon: {
    width: 50, 
    height: 50,
    resizeMode: 'contain',
    tintcolor: 'black',
  },
});

export default ProfileScreen;