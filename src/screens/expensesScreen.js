import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import NextButtonWithDots from "../components/NextButtonWithDots";

const ExpensesScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: "", store: "", amount: "" });

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleNewExpenseChange = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
  };

  const addExpense = () => {
    if (newExpense.date && newExpense.store && newExpense.amount) {
      setExpenses([{ ...newExpense, amount: parseFloat(newExpense.amount) }, ...expenses]);
      setNewExpense({ date: "", store: "", amount: "" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Pig Icon */}
      <Image
        source={require('../../assets/Pig/front_smile_transparent.png')}
        style={styles.pigIcon}
      />
      {/* Current Expenses Section */}
      <Text style={styles.sectionTitle}>
        Firstly, we need to get an idea of your expenses. By logging in with your bank, we are able to view your transactions and can help identify where and how you spend your money. Please correct the amount, if it is incorrect.
      </Text>
            {/* Login to the Bank Section */}
        <TouchableOpacity style={styles.bankButton} onPress={() => {}}>
        <Text style={styles.bankButtonText}>Login to the bank</Text>
      </TouchableOpacity>
      <View style={styles.currentExpensesContainer}>
        <ScrollView style={styles.expensesList} nestedScrollEnabled={true}>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text>{expense.store}</Text>
              <Text>{expense.amount},-</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add Expense Section */}
      <View style={styles.expensesContainer}>
        <Text style={styles.expenseTitle}>Add Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Date (DD-MM)"
          value={newExpense.date}
          onChangeText={(text) => handleNewExpenseChange("date", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Store / Name"
          value={newExpense.store}
          onChangeText={(text) => handleNewExpenseChange("store", text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount (kr.)"
          value={newExpense.amount.toString()}
          onChangeText={(text) => handleNewExpenseChange("amount", text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <NextButtonWithDots
        navigation={navigation}
        nextScreen="MonthlyDisposableIncome"
        activeDotIndex={2}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  profileContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expensesContainer: {
    width: "90%",
    backgroundColor: "#ffe5e5",
    padding: 16,
    borderRadius: 12,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    lineHeight: 25,
    paddingHorizontal: '5%',
    marginBottom: 10,
  },
  sectionTitleTwo: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    lineHeight: 25,
    paddingHorizontal: '5%',
    marginBottom: 10,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#f88",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bankButton: {
    backgroundColor: "#2ECC71",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: '80%',
    height: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bankButtonText: {
    color: 'white',
    fontSize: 16,
  },
  currentExpensesContainer: {
    width: "90%",
    backgroundColor: "#ffe5e5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },
  expensesList: {
    maxHeight: 100, // Limit the height of the scrollable list
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    width: '80%',
  },
  pigIcon: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default ExpensesScreen;