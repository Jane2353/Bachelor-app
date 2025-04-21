import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Added Text import
import NavigationButtons from '../components/NavigationButtons';

// Reusable ItemBox component
const ItemBox = ({ label }) => (
  <View style={styles.itemsBox}>
    <Text>{label}</Text>
  </View>
);

const PigShopScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigShopScreen" />
      <Text style={styles.textShop}>
        Welcome to the Pig Shop. Here you can buy items for your pig. Click on the items to view them.
      </Text>
      <View style={styles.itemsContainer}>
        <ItemBox label="Item 1" />
        <ItemBox label="Item 2" />
        <ItemBox label="Item 3" />
        <ItemBox label="Item 4" />
        <ItemBox label="Item 5" />
        <ItemBox label="Item 6" />
        <ItemBox label="Item 7" />
        <ItemBox label="Item 8" />
        <ItemBox label="Item 9" />
        <ItemBox label="Item 10" />
        <ItemBox label="Item 11" />
        <ItemBox label="Item 12" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textShop: {
    marginTop: '10%',
    fontSize: 18,
    color: 'black',
    width: '80%',
    marginBottom: '5%',
  },
  itemsContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemsBox: {
    width: '30%',
    aspectRatio: 1, // gør boksen kvadratisk
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, // lidt luft omkring boksene
  },
});

export default PigShopScreen;
