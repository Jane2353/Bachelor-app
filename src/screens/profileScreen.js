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
  },
  text: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;