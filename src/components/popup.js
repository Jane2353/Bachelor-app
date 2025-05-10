import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

export default function Popup({
  modalVisible,
  setModalVisible,
  title,
  message,
  imageSource,
}) {
  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePurchase = () => {
    // Logic for handling the purchase can be added here
    console.log("Purchase button clicked");
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modal}>
              <Text style={styles.modalTextBold}>{title}</Text>
              {imageSource && (
                <Image style={styles.modalImage} source={imageSource} />
              )}
              {message ? <Text style={styles.modalText}>{message}</Text> : null}
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={handlePurchase}
              >
                <Text style={styles.purchaseButtonText}>Purchase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "70%",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    alignContent: "center",
    textAlign: "center",
  },
  modalTextBold: {
    fontSize: 24,
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalImage: {
    width: 200, // Adjusted size for smaller icons
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
    resizeMode: "contain",
  },
  purchaseButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  purchaseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
