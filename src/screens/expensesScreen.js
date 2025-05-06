import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
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
      

      {/* Add Expense Section */}
      <View style={styles.expensesContainer}>
        <Text style={styles.sectionTitle}>Add Expense</Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  expensesContainer: {
    width: "100%",
    backgroundColor: "#ffe5e5",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
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
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
});

export default ExpensesScreen;