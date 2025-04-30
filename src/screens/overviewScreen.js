import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform,LayoutAnimation } from "react-native";
import Popup from '../components/popup';
import Papa from "papaparse";



// Category colors
const categoryColors = [
  "#FFB3B3", // Light Red
  "#FFCC99", // Light Orange
  "#FFFF99", // Light Yellow
  "#B3FFB3", // Light Green
  "#B3E5FF", // Light Blue
  "#D1B3FF", // Light Purple
  "#FFB3E6", // Light Pink
];

// Helper to get color based on index
const getCategoryColor = (index) => {
  return categoryColors[index % categoryColors.length];
};


const OverviewScreen = () => {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: "", store: "", amount: "", category: "", recurring: false });

  const addExpense = () => {
    if (newExpense.date && newExpense.store && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, category: newExpense.category || "Uncategorized" }]);
      setNewExpense({ date: "", store: "", amount: "", category: "", recurring: false });
    }
  };

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
            store: row.store || "Unknown Store",
            amount: parseFloat(row.amount) || 0,
            category: row.category || "Uncategorized", // Default to "Uncategorized" if missing
            recurring: row.recurring === "true"
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
  const categories = [
    ...Array.from(new Set(expenses.map(exp => exp.category).filter(Boolean))),
    "Uncategorized",
  ];
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/Pig/front_smile.png")}
        style={styles.pigImage}
      />

      <Text style={styles.title}>Overview</Text>
      <Text style={styles.subtitle}>You spent {totalSpent.toFixed(2)} kr. out of {totalBudget} kr.</Text>

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
  <ScrollView
    contentContainerStyle={styles.scrollContent} // Ensures proper alignment
    nestedScrollEnabled={true} // Enables nested scrolling
    showsVerticalScrollIndicator={true} // Displays a vertical scroll indicator
  >
    {categories.map((cat, index) => {
      const color = getCategoryColor(index);
      const isExpanded = selectedCategory === cat;

      return (
        <View key={index}>
          <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: "#e0e0e0" }]}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setSelectedCategory(isExpanded ? null : cat);
            }}
          >
            <View style={[styles.categoryCircle, { backgroundColor: color }]} />
            <Text style={styles.categoryCardText}>{cat}</Text>
            <Text style={styles.categoryCardAmount}>
              {expenses
                .filter(e => (cat === "Uncategorized" ? !e.category : e.category === cat))
                .reduce((sum, e) => sum + parseFloat(e.amount), 0)
                .toFixed(2)}{" "}
              kr.
            </Text>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.expensesList}>
              {expenses.filter(e =>
                cat === "Uncategorized" ? !e.category : e.category === cat
              ).length === 0 ? (
                <Text style={styles.noExpensesText}>No expenses yet in this category.</Text>
              ) : (
                expenses
                  .filter(e => cat === "Uncategorized" ? !e.category : e.category === cat)
                  .map((exp, idx) => (
                    <View key={idx} style={styles.expenseItem}>
                      <Text style={styles.expenseItemDate}>{exp.date}</Text> {/* Display the date first */}
                      <Text style={styles.expenseItemText}>{exp.store || "Unknown Store"}</Text> {/* Display the store name */}
                      <Text style={styles.expenseItemAmount}>{parseFloat(exp.amount).toFixed(2)} kr.</Text> {/* Display the amount */}
                    </View>
                  ))
              )}
            </View>
          )}
        </View>
      );
    })}
  </ScrollView>
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
    width: "100%",
    marginTop: 10,
    height: 300, // Set a fixed height for the scrollable area
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10, // Adds spacing at the bottom
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 40,
    padding: 10,
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  categoryCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  categoryCardText: {
    flex: 1,
    fontSize: 16,
  },
  categoryCardAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expensesList: {
    marginTop: 20,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  expenseItemText: {
    fontSize: 16,
  },
  expenseItemAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noExpensesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  expensesList: {
    marginTop: 20,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  expenseItemText: {
    fontSize: 16,
  },
  expenseItemAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4, // Add spacing below the name
  },
});

export default OverviewScreen;
