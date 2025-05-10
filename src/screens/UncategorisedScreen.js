import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const UncategorisedScreen = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [uncategorisedExpenses, setUncategorisedExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null); // Track the selected expense
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility
  const [categories, setCategories] = useState([]); // Dynamically generated categories

  useEffect(() => {
    const fetchExpenses = () => {
      try {
        const data = localStorage.getItem("expenses"); // Fetch from localStorage
        if (data) {
          const parsed = JSON.parse(data);

          // Filter uncategorised expenses
          const filtered = parsed.filter(
            (item) => !item.category || item.category.trim() === ""
          );
          const sorted = filtered.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setUncategorisedExpenses(sorted);

          // Dynamically generate categories from all expenses, excluding "Uncategorized"
          const uniqueCategories = [
            ...new Set(
              parsed
                .map((exp) => exp.category)
                .filter(Boolean)
                .filter((cat) => cat !== "Uncategorized")
            ),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching uncategorised expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}`;
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense); // Set the selected expense
    setIsModalVisible(true); // Show the modal
  };

  const handleCategorySelect = (category) => {
    if (selectedExpense) {
      // Update the selected expense with the chosen category
      const updatedExpenses = uncategorisedExpenses.map((expense) =>
        expense === selectedExpense ? { ...expense, category } : expense
      );

      setUncategorisedExpenses(updatedExpenses); // Update the state
      setIsModalVisible(false); // Hide the modal

      // Save the updated expenses to localStorage
      const allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      const updatedAllExpenses = allExpenses.map((expense) =>
        expense.date === selectedExpense.date &&
        expense.amount === selectedExpense.amount
          ? { ...expense, category }
          : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedAllExpenses));
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Piggy image placeholder */}
      <Image
        source={require("../../assets/Pig/side_worried.png")}
        style={styles.piggyImage}
      />

      {/* Speech bubble */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>
          I am getting worried!{"\n"}You have uncategorised expenses
        </Text>
      </View>

      {/* Instruction text */}
      <Text style={styles.instructionText}>
        Click on the expenses in order to categorise them
      </Text>

      {/* Scrollable expenses list */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {uncategorisedExpenses.map((expense, index) => (
          <TouchableOpacity
            key={index}
            style={styles.expenseCard}
            onPress={() => handleExpenseClick(expense)} // Handle expense click
          >
            <Text style={styles.expenseText}>
              On the {formatDate(expense.date)} you spent:{" "}
              {parseFloat(expense.amount).toFixed(0)},- in{" "}
              {expense.store || "Unknown Store"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for categorization */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)} // Close modal on request
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => handleCategorySelect(item)} // Handle category selection
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)} // Close modal
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backArrow: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  piggyImage: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: 30,
  },
  speechBubble: {
    backgroundColor: "#f8c0c0",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  speechText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  instructionText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adds spacing at the bottom
  },
  expenseCard: {
    backgroundColor: "#f89da1",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  expenseText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff6666",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UncategorisedScreen;
