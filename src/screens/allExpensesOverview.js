import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const allExpensesOverviewScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch expenses from localStorage on mount
    const fetchExpenses = () => {
      try {
        const data = localStorage.getItem('expenses');
        if (data) {
          const parsed = JSON.parse(data);

          // Sort expenses by date (most recent first)
          const sorted = parsed.sort((a, b) => {
            const [dayA, monthA] = a.date.split('-').map(Number); // Parse dd-mm
            const [dayB, monthB] = b.date.split('-').map(Number); // Parse dd-mm
            const dateA = new Date(2025, monthA - 1, dayA); // Create Date object (year is arbitrary)
            const dateB = new Date(2025, monthB - 1, dayB); // Create Date object (year is arbitrary)
            return dateB - dateA; // Sort descending
          });

          setExpenses(sorted);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/Pig/front_smile.png')} style={styles.piggyImage} />

      {/* Placeholder for the Pie Chart */}
      <View style={styles.pieChartPlaceholder}>
        <Text>PieChartPlaceholder</Text>
      </View>

      {/* Category and Expenses buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.expensesButton}
          onPress={() => navigation.navigate('Overview')}
        >
          <Text style={styles.expensesButtonText}>Expenses</Text>
        </TouchableOpacity>
      </View>

      {/* Expenses list */}
      <View style={styles.expensesListContainer}>
        <ScrollView
          contentContainerStyle={styles.expensesListContent}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
        >
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
              <Text style={styles.expenseName}>{expense.store || 'No Store Name'}</Text>
              <Text style={styles.expenseAmount}>{parseFloat(expense.amount).toFixed(0)},-</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const formatDate = (dateString) => {
  // Assuming the date is already in dd-mm format
  return dateString;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  piggyImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  pieChartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  expensesButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  expensesButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  expensesListContainer: {
    width: '100%',
    height: 300, // Set a fixed height for the scrollable area
    marginTop: 10,
  },
  expensesListContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding at the bottom for better spacing
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  expenseDate: {
    flex: 1,
    fontWeight: 'bold',
  },
  expenseName: {
    flex:2,
    textAlign: 'center',
  },
  expenseAmount: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default allExpensesOverviewScreen;


