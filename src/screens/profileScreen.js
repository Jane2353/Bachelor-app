import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red', // Fixed typo from 'colour' to 'color'
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;