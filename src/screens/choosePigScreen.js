import {StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import NextButtonWithDots from '../components/NextButtonWithDots';

const ChoosePigScreen = ({ navigation }) => {
  const [pigName, setPigName] = useState('');
  const [selectedPig, setSelectedPig] = useState(null); // Track the selected pig

  // Load the pig's name and selected pig from localStorage on mount
  useEffect(() => {
    const storedPigName = localStorage.getItem('pigName');
    const storedSelectedPig = localStorage.getItem('selectedPig');
    if (storedPigName) {
      setPigName(storedPigName);
    }
    if (storedSelectedPig) {
      setSelectedPig(parseInt(storedSelectedPig, 10)); // Parse the stored index
    }
  }, []);

  // Save the pig's name to localStorage whenever it changes
  const handlePigNameChange = (name) => {
    setPigName(name);
    localStorage.setItem('pigName', name);
  };

  // Save the selected pig to localStorage
  const handlePigSelect = (index) => {
    setSelectedPig(index);
    localStorage.setItem('selectedPig', index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          The Piggy <Text style={styles.highlight}>Bank</Text> 
          <Image source={require('../../assets/Pig/front_happy_transparent.png')} style={styles.icon} />
        </Text>
        <Text style={styles.description}>
          Complete challenges that help manage your finances. By keeping up with your challenges, 
          you can ensure your pig stays happy. Watch your hard work pay off, as you watch your pig grow up!
        </Text>
        <View style={styles.pigContainer}>
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.pigItem}>
              <Image
                source={require('../../assets/Pig/side_happy_transparent.png')}
                style={styles.pigImage}
              />
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedPig === index && styles.selectedButton, // Highlight selected pig
                ]}
                onPress={() => handlePigSelect(index)} // Save selected pig
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    selectedPig === index && styles.selectedButtonText, // Change text color for selected pig
                  ]}
                >
                  {selectedPig === index ? 'Selected' : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.inputLabel}>
          What is the name of <Text style={styles.highlight}>your</Text> pig?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={pigName}
          onChangeText={handlePigNameChange} // Save the name to localStorage on change
        />
      </View>
      <NextButtonWithDots
        navigation={navigation}
        nextScreen="ExpensesScreen"
        activeDotIndex={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  highlight: {
    color: '#2ECC71',
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 5,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    padding: '5%',
    lineHeight: 25,
  },
  pigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  pigItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pigImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FFD700', // Highlight selected pig button
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#000', // Change text color to black for selected pig
  },
  inputLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
});

export default ChoosePigScreen;