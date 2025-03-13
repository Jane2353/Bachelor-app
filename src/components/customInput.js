import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const CustomInput = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '70%',
    marginBottom: 10,
  },
  label: {
    color: '#383838',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 15,
  },
});

export default CustomInput;
