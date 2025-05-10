import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import NextButtonWithDots from "../components/NextButtonWithDots";

const ExpensesScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    store: "",
    amount: "",
  });
  const fileInputRef = useRef(null); // Create a ref for the file input

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
      setExpenses([
        { ...newExpense, amount: parseFloat(newExpense.amount) },
        ...expenses,
      ]);
      setNewExpense({ date: "", store: "", amount: "" });
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedExpenses = results.data.map((row) => ({
            date: row.date || "",
            store: row.store || "Unknown Store",
            amount: parseFloat(row.amount) || 0,
            category: row.category || "Uncategorized", // Default to "Uncategorized" if missing
          }));

          // Simple validation
          const invalidRows = parsedExpenses.filter(
            (e) => !e.date || !e.store || isNaN(e.amount)
          );
          if (invalidRows.length > 0) {
            alert("CSV upload failed: Some rows have missing required fields.");
            return;
          }

          // Clear previous data in localStorage
          localStorage.removeItem("expenses");

          // Save the new data to localStorage
          localStorage.setItem("expenses", JSON.stringify(parsedExpenses));

          // Update the state with the new expenses
          setExpenses(parsedExpenses);
        },
        error: (error) => {
          alert("Failed to parse CSV file.");
          console.error(error);
        },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Pig Icon */}
      <Image
        source={require("../../assets/Pig/front_smile_transparent.png")}
        style={styles.pigIcon}
      />
      {/* Current Expenses Section */}
      <Text style={styles.sectionTitle}>
        Firstly, we need to get an idea of your expenses. By logging in with
        your bank, we are able to view your transactions and can help identify
        where and how you spend your money.
      </Text>
      {/* Login to the Bank Section */}
      <TouchableOpacity style={styles.bankButton} onPress={() => {}}>
        <Text style={styles.bankButtonText}>Login to the bank</Text>
      </TouchableOpacity>

      {/* CSV Upload Button */}
      <TouchableOpacity
        style={styles.csvButton}
        onPress={() => fileInputRef.current.click()} // Trigger the file input
      >
        <Text style={styles.csvButtonText}>Upload CSV</Text>
      </TouchableOpacity>
      <input
        ref={fileInputRef} // Attach the ref to the input
        type="file"
        accept=".csv"
        style={styles.csvInput} // Keep it hidden
        onChange={handleCSVUpload}
      />

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
    color: "#000",
    lineHeight: 25,
    paddingHorizontal: "5%",
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
    marginTop: 10,
    width: "80%",
    height: "5%",
    alignSelf: "center",
    justifyContent: "center",
  },
  bankButtonText: {
    color: "white",
    fontSize: 16,
  },
  csvButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
  },
  csvInput: {
    display: "none", // Keep the input hidden
  },
  csvButtonText: {
    color: "white",
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
    width: "80%",
  },
  pigIcon: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default ExpensesScreen;
