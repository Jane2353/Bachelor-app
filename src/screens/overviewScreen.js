import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from "react-native";
import Popup from '../components/popup';
import Papa from "papaparse";

const OverviewScreen = () => {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: "", store: "", amount: "", category: "", recurring: false });
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedExpenses = results.data.map(row => ({
            date: row.date || "",
            store: row.store || "",
            amount: parseFloat(row.amount) || 0,
            category: row.category || "",
            recurring: row.recurring === "true" // handle boolean as text
          }));

          // Simple validation
          const invalidRows = parsedExpenses.filter(
            e => !e.date || !e.store || isNaN(e.amount)
          );
          if (invalidRows.length > 0) {
            alert("CSV upload failed: Some rows have missing required fields.");
            return;
          }

          setExpenses(parsedExpenses);
        },
        error: (error) => {
          alert("Failed to parse CSV file.");
          console.error(error);
        }
      });
    }
  };

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  // Get all unique categories dynamically
  const categories = ["All", ...Array.from(new Set(expenses.map(exp => exp.category).filter(Boolean)))];

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
          onChange={(e) => handleCSVUpload(e)}
          style={{ marginVertical: 10 }}
        />
      )}

      {/* Category Buttons */}
      <View style={styles.categoriesContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === cat && styles.selectedCategoryButtonText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Expenses List */}
      <View style={styles.expensesContainer}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === "All" ? "All Expenses" : `${selectedCategory} Expenses`}
        </Text>
        {filteredExpenses.length === 0 ? (
          <Text style={{ marginTop: 10 }}>No expenses in this category.</Text>
        ) : (
          <ScrollView
            style={styles.expensesScrollView} // Add a specific style for the scrollable area
            showsVerticalScrollIndicator={true} // Show a vertical scroll indicator
          >
            {filteredExpenses.map((item, index) => (
              <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseDate}>{item.date}</Text>
              <Text style={styles.expenseStore}>{item.store}</Text>
              <Text style={styles.expenseAmount}>{item.amount.toFixed(2)} kr.</Text>
              <Text style={styles.expenseRecurring}>{item.recurring ? "Recurring" : ""}</Text>
            </View>            
            ))}
          </ScrollView>
        )}
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
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "center",
  },
  categoryButton: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  selectedCategoryButton: {
    backgroundColor: "#f88",
  },
  categoryButtonText: {
    color: "#333",
  },
  selectedCategoryButtonText: {
    color: "#fff",
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
  expensesScrollView: {
    maxHeight: 300, // Set a maximum height for the scrollable area
    marginTop: 10,
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  pigImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  expenseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  expenseDate: {
    width: 60,
    fontSize: 14,
  },
  expenseStore: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
  expenseAmount: {
    width: 80,
    fontSize: 14,
    textAlign: "right",
  },
  expenseRecurring: {
    width: 70,
    fontSize: 10,
    color: "#555",
    textAlign: "right",
    marginLeft: 5,
  },
  
});

export default OverviewScreen;
