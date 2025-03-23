import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfileScreen = () => {
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.icon} source={require('../../assets/user.png')} />
        <Text style={styles.text}>Albert Filipsen</Text>
        <Text style={styles.textSmall}>Sparegris: </Text>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, isPressed1 && styles.boxPressed]}
          onPressIn={() => setIsPressed1(true)}
          onPressOut={() => setIsPressed1(false)}
          activeOpacity={1}
        >
          <Text style={styles.boxText}>Opsparet genstand</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, isPressed2 && styles.boxPressed]}
          onPressIn={() => setIsPressed2(true)}
          onPressOut={() => setIsPressed2(false)}
          activeOpacity={1}
        >
          <Text style={styles.boxText}>Badges</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingTop: '10%',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginTop: 10, 
  },
  textSmall: {
    color: 'black',
    fontSize: 14,
    marginTop: 5, 
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: 'black',
  },




  boxContainer: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%', 
    backgroundColor: 'grey',
  },
  box: {
    backgroundColor: 'grey',
    width: '50%', 
    height: '10%', 
    borderRadius: 10, 
    borderColor: 'black', 
    borderWidth: 1.5, 
    marginBottom: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  boxPressed: {
    backgroundColor: 'blue',
  },
  boxText: {
    color: 'white',
    fontSize: 13,
  },
});

export default ProfileScreen;