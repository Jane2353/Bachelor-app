import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AllExpensesOverviewScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(10000); // Default budget
  const navigation = useNavigation();

  useEffect(() => {
    const storedBudget = localStorage.getItem("totalBudget"); // Retrieve totalBudget
    if (storedBudget) {
      setTotalBudget(parseFloat(storedBudget)); // Set totalBudget from localStorage
    }
  }, []);

  useEffect(() => {
    // Fetch expenses and budget from localStorage on mount
    const fetchExpensesAndBudget = () => {
      try {
        const data = localStorage.getItem("expenses");
        const storedBudget = localStorage.getItem("totalBudget");

        if (data) {
          const parsed = JSON.parse(data);

          // Sort expenses by date (most recent first)
          const sorted = parsed.sort((a, b) => {
            const [dayA, monthA] = a.date.split("-").map(Number); // Parse dd-mm
            const [dayB, monthB] = b.date.split("-").map(Number); // Parse dd-mm
            const dateA = new Date(2025, monthA - 1, dayA); // Create Date object (year is arbitrary)
            const dateB = new Date(2025, monthB - 1, dayB); // Create Date object (year is arbitrary)
            return dateB - dateA; // Sort descending
          });

          setExpenses(sorted);
        }

        if (storedBudget) {
          setTotalBudget(parseFloat(storedBudget)); // Load budget from localStorage
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExpensesAndBudget();
  }, []);

  useEffect(() => {
    // Save totalBudget to localStorage whenever it changes
    localStorage.setItem("totalBudget", totalBudget);
  }, [totalBudget]);

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0); // Calculate total spent

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/Pig/front_smile.png")}
        style={styles.piggyImage}
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Overview</Text>
      <Text style={styles.subtitle}>
        You spent {totalSpent.toFixed(2)} kr. out of {totalBudget} kr.
      </Text>

      {/* Progress Bar for Shown Expenses */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(totalSpent / totalBudget) * 100}%` }, // Allow progress to exceed 100%
          ]}
        />
      </View>
      <Text style={styles.percentageText}>
        {((totalSpent / totalBudget) * 100).toFixed(1)}% of your budget spent
      </Text>

      {/* Category and Expenses buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.expensesButton}
          onPress={() => navigation.navigate("Overview")}
        >
          <Text style={styles.expensesButtonText}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate("Overview")}
        >
          <Text style={styles.categoryButtonText}>Category</Text>
        </TouchableOpacity>
      </View>

      {/* Expenses list */}
      <View style={styles.expensesListContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
        >
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
              <Text style={styles.expenseName}>
                {expense.store || "No Store Name"}
              </Text>
              <Text style={styles.expenseAmount}>
                {parseFloat(expense.amount).toFixed(0)},-
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const formatDate = (dateString) => {
  return dateString; // Assuming the date is already in dd-mm format
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  piggyImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
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
    height: 30, 
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8, 
    textAlign: "center",
    width: 100, 
    marginRight: 10, 
  },
  fileInput: {
    fontSize: 12, 
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  categoryButtonText: {
    fontWeight: "bold",
    color: "black",
  },
  expensesButton: {
    backgroundColor: "black",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  expensesButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  expensesListContainer: {
    width: "100%",
    marginTop: 10,
    height: 400, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  expenseDate: {
    flex: 1,
    fontWeight: "bold",
  },
  expenseName: {
    flex: 2,
    textAlign: "center",
  },
  expenseAmount: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default AllExpensesOverviewScreen;
