import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const CustomButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonCont} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      {icon && <Image style={styles.buttonIcon} source={icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonCont: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    height: 55,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonIcon: {
    tintColor: 'white',
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CustomButton;
