import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

export default function Popup({ modalVisible, setModalVisible }) {
  const closeModal = () => {
    setModalVisible(false);
  }

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
                    <Text style={styles.modalText}>Congratulations! </Text>
                    <Text style={styles.modalText}>You have earned an achievement</Text>
                </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '70%',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});