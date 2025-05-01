import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const UncategorisedScreen = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [uncategorisedExpenses, setUncategorisedExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = () => {
      try {
        const data = localStorage.getItem('expenses'); // Fetch from localStorage
        if (data) {
          const parsed = JSON.parse(data);
          const filtered = parsed.filter(
            item => !item.category || item.category.trim() === ''
          );
          const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          setUncategorisedExpenses(sorted);
        }
      } catch (error) {
        console.error('Error fetching uncategorised expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Piggy image placeholder */}
      <Image source={require('../../assets/Pig/side_worried.png')} style={styles.piggyImage} />
      
      {/* Speech bubble */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>I am getting worried!{'\n'}You have uncategorised expenses</Text>
      </View>

      {/* Instruction text */}
      <Text style={styles.instructionText}>
        Click on the expenses in order to categorise them
      </Text>

      {/* Scrollable expenses list */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {uncategorisedExpenses.map((expense, index) => (
          <TouchableOpacity key={index} style={styles.expenseCard}>
            <Text style={styles.expenseText}>
              On the {formatDate(expense.date)} you spent: {parseFloat(expense.amount).toFixed(0)},- in {expense.store || 'Unknown Store'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backArrow: { 
    position: "absolute", 
    top: 20, 
    left: 20, 
    zIndex: 10 
  },
  piggyImage: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: 30,
  },
  speechBubble: {
    backgroundColor: '#f8c0c0',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  speechText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  instructionText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adds spacing at the bottom
  },
  expenseCard: {
    backgroundColor: '#f89da1',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  expenseText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UncategorisedScreen;
