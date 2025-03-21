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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default ProfileScreen;