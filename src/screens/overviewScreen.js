import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import Popup from '../components/popup';

const OverviewScreen = () => {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: "", store: "", amount: "" });

  // Load from localStorage on mount
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const storedBudget = JSON.parse(localStorage.getItem("totalBudget"));

    if (storedExpenses) setExpenses(storedExpenses);
    if (storedBudget) setTotalBudget(storedBudget);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalBudget", JSON.stringify(totalBudget));
  }, [expenses, totalBudget]);

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const progress = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(1);

  const handleNewExpenseChange = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
  };

  const addExpense = () => {
    if (newExpense.date && newExpense.store && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ date: "", store: "", amount: "" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
  source={require("../../assets/Pig/front_smile.png")}
  style={styles.pigImage}
/>

      <Text style={styles.title}>Overview</Text>
      <Text style={styles.subtitle}>You spent {totalSpent} kr. out of {totalBudget} kr.</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter total budget (kr.)"
        value={totalBudget.toString()}
        onChangeText={(text) => setTotalBudget(Number(text))}
      />

      <View style={styles.expensesContainer}>
        <Text style={styles.sectionTitle}>Add Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Date (MM-DD)"
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

      <View style={styles.expensesContainer}>
        <Text style={styles.sectionTitle}>Expenses</Text>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.expenseRow}>
            <Text>{expense.date}</Text>
            <Text>{expense.store}</Text>
            <Text>{expense.amount} kr.</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#f99",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
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
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
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
  pigImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  
});

export default OverviewScreen;
