import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/customButton';
import CustomInput from '../components/customInput';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Log på med MitID</Text>
        <Image style={styles.mitidIcon} source={require('../../assets/mitid.png')} />
      </View>

      <View style={styles.line} />

      {/* Custom Input */}
      <CustomInput label="BRUGER-ID" placeholder="Indtast dit bruger-ID" value={userId} onChangeText={setUserId} />

      {/* Custom Button */}
      <CustomButton title="FORTSÆT" icon={require('../../assets/right-arrow.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  textTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mitidIcon: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  line: {
    width: '70%',
    height: 1,
    backgroundColor: '#c8c8c8',
    marginBottom: 50,
  },
});

export default LoginScreen;
