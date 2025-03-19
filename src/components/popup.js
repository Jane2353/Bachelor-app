import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';

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
                    <Text style={styles.modalTextBold}>Congratulations </Text>
                    <Text style={styles.modalText}>You have earned a new badge</Text>
                    <Image style={styles.modalImage} source={require('../../assets/badge.png')} />
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
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalTextBold: {
  fontSize: 24,
  marginBottom: 20,
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
  },
  modalImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  }
});