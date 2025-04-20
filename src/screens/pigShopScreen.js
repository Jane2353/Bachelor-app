import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Added Text import
import NavigationButtons from '../components/NavigationButtons';

const PigShopScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigShopScreen" />
      <Text style={styles.textShop}>
        Welcome to the Pig Shop. Here you can buy items for your pig. Click on the items to view them.
      </Text>
      <View style={styles.itemsContainer}>
        <View style={styles.itemsBox}>
          <Text>Item 1</Text>
        </View>
        <View style={styles.itemsBox}>
          <Text>Item 2</Text>
        </View>
        <View style={styles.itemsBox}>
          <Text>Item 3</Text>
        </View>
        <View style={styles.itemsBox}>
          <Text>Item 4</Text>
          </View>
        <View style={styles.itemsBox}>
          <Text>Item 5</Text>
          </View>
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
    colour: 'black',
    width: '80%',
    marginBottom: '5%',
  },
  itemsContainer: {
    width: '80%',
    height: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  itemsBox: {
    width: '30%',
    height: '10%', 
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
  },
});

export default PigShopScreen;
