import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const UncategorisedScreen = () => {
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
    return `${day}/${month}`;
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => {/* placeholder */}}>
        <Text style={{ fontSize: 24 }}>{'\u25C0'}</Text>
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

      <ScrollView style={styles.scrollView}>
        {uncategorisedExpenses.map((expense, index) => (
          <TouchableOpacity key={index} style={styles.expenseCard}>
            <Text style={styles.expenseText}>You spent:</Text>
            <Text style={styles.dateText}>{formatDate(expense.date)}</Text>
            <Text style={styles.amountText}>{parseFloat(expense.amount).toFixed(0)},-</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backArrow: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
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
  scrollView: {
    flex: 1,
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
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f89da1',
    borderRadius: 20,
    marginTop: 10,
  },
  navItem: {
    fontSize: 24,
  },
});

export default UncategorisedScreen;
