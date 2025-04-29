import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Picker } from 'react-native'; // Use Picker from react-native instead of @react-native-picker/picker

const PigCategorise = () => {
  const [selectedCategories, setSelectedCategories] = useState({}); // State to track selected categories
  const [expenses, setExpenses] = useState([ // State to track expenses
    { id: 1, date: '16/04', description: 'AAU', amount: '15,-' },
    { id: 2, date: '16/04', description: 'AAU', amount: '200,-' },
    { id: 3, date: '16/04', description: 'H&M', amount: '520,-' },
  ]);

  const categories = [
    'Food', 'Transport', 'Clothing', 'Entertainment', 'Health',
    'Education', 'Utilities', 'Travel', 'Savings', 'Other',
  ];

  const handleConfirm = () => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => !selectedCategories[expense.id]) // Keep only uncategorised expenses
    );
  };

  const renderExpense = ({ item }) => {
    const isCategorised = !!selectedCategories[item.id]; // Check if a category is selected

    return (
      <View
        style={[
          styles.expenseRow,
          isCategorised && styles.expenseRowCategorised, // Apply green background if categorised
        ]}
      >
        <View style={styles.expenseData}>
          <Text style={styles.expenseText}>{item.date}</Text>
          <Text style={styles.expenseText}>{item.description}</Text>
          <Text style={styles.expenseText}>{item.amount}</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedCategories[item.id] || ''}
            onValueChange={(value) =>
              setSelectedCategories((prev) => ({ ...prev, [item.id]: value }))
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.navigate('PigScreen')} // Explicitly navigate to PigScreen
        >
          <Image
            style={styles.arrowIcon}
            source={require('../../assets/left_arrow.png')} // Left arrow icon
          />
        </TouchableOpacity>
        <Image
          style={styles.pigIcon}
          source={require('../../assets/Pig/side_happy_transparent.png')}
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechBubbleText}>
            Categorise your expenses in order to make me happier!
          </Text>
          <View style={styles.speechBubbleTail} />
        </View>
      </View>
      <Text style={styles.instructionText}>
        Click on the expenses in order to categorise them
      </Text>
      <View style={styles.expensesContainer}>
        <FlatList
          data={expenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item.id.toString()}
          style={styles.expensesList}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: '10%',
  },
  backArrow: {
    marginRight: 10, 
  },
  arrowIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  pigIcon: {
    width: 95,
    height: 95,
    resizeMode: 'contain',
  },
  speechBubble: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FE9894',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FE9894',
    flex: 1,
    position: 'relative',
  },
  speechBubbleText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  expensesList: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE9894', 
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  expenseRowCategorised: {
    backgroundColor: '#2ECC71', 
  },
  expenseData: {
    flex: 2, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  expenseText: {
    fontSize: 14,
    color: 'black',
  },
  dropdownContainer: {
    flex: 1.5, 
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 5,
    height: 50,
  },
  picker: {
    height: 50, 
    width: '100%',
  },
  expensesContainer: {
    width: '90%',
    height: '50%', 
    borderWidth: 1, 
    borderColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20, 
    padding: 10, 
  },
  confirmButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 10,
    width: '80%',
    height: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PigCategorise;
