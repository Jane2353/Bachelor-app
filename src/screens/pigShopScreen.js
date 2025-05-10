import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import NavigationButtons from "../components/NavigationButtons";
import Popup from "../components/popup";

// Reusable ItemBox component
const ItemBox = ({ label, onPress, icon }) => (
  <TouchableOpacity
    style={styles.itemsBox}
    onPress={() => onPress(label, icon)}
  >
    {icon && <Image source={icon} style={styles.icon} />}
    <Text>{label}</Text>
  </TouchableOpacity>
);

const PigShopScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleItemPress = (label, icon) => {
    setSelectedLabel(label);
    setSelectedIcon(icon || null);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigShopScreen" />
      <Text style={styles.textShop}>
        Welcome to the Pig Shop. Here you can buy items for your pig. Click on
        the items to view them.
      </Text>
      <Text style={styles.textTotal}>BaconBucks = 1000</Text>
      <View style={styles.line} />
      <View style={styles.itemsContainer}>
        <ItemBox
          label="Summer hat"
          onPress={handleItemPress}
          icon={require("../../assets/Pig/pigHat.png")}
        />
      </View>
      <Popup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Summer hat"
        message="This is a summer hat for your pig. It costs 100 BaconBucks."
        imageSource={selectedIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textShop: {
    marginTop: "5%",
    fontSize: 15,
    color: "black",
    width: "80%",
    marginBottom: "2%",
  },
  textTotal: {
    marginTop: "2%",
    fontSize: 15,
    color: "black",
    width: "80%",
  },
  itemsContainer: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  itemsBox: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    margin: 5, 
  },
  icon: {
    width: 100,
    height: 50,
    marginBottom: 5,
    resizeMode: "contain",
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: "black",
    marginBottom: "2%",
  },
});

export default PigShopScreen;
