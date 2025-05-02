import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from "react-native";
import Popup from '../components/popup';
import Papa from "papaparse";

const OverviewScreen = () => {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const storedBudget = JSON.parse(localStorage.getItem("totalBudget"));

    if (storedExpenses) setExpenses(storedExpenses);
    if (storedBudget) setTotalBudget(storedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalBudget", JSON.stringify(totalBudget));
  }, [expenses, totalBudget]);

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const progress = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(1);

  

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          window.alert("CSV is empty or could not be read.");
          return;
        }
  
        const parsedExpenses = results.data.map((row, idx) => {
          const date = row.date || row.Date || "";
          const store = row.store || row.Store || "";
          const amount = parseFloat(row.amount || row.Amount || 0);
          const category = row.category || row.Category || null; // Include category field
  
          return { date, store, amount, category };
        }).filter(exp => exp.date && exp.store && !isNaN(exp.amount));
  
        if (parsedExpenses.length === 0) {
          window.alert("CSV does not contain valid expense entries. Make sure it has 'date', 'store', 'amount', and optionally 'category' columns.");
          return;
        }
  
        // ✅ Replace expenses if valid
        setExpenses(parsedExpenses);
        window.alert("Expenses successfully loaded!");
      },
      error: (err) => {
        console.error("CSV parse error:", err);
        window.alert("Failed to parse CSV. Please try again.");
      }
    });
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

      {Platform.OS === "web" && (
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          style={{ marginVertical: 10 }}
        />
      )}

      

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
    alignItems: "center",
    flexGrow: 1,
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
