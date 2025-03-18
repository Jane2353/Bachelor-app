import React from 'react'; // Fix import statement
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Fix import statement

const ProfileScreen = () => {
  return (
    <View>
      <Text style={styles.container}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    colour: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;