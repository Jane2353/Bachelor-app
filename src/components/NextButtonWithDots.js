import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NextButtonWithDots = ({ navigation, nextScreen, activeDotIndex }) => {
  return (
    <View style={styles.container}>
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeDotIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(nextScreen)}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30, // Consistent spacing from the bottom
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A8E6CF',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2ECC71',
  },
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NextButtonWithDots;
