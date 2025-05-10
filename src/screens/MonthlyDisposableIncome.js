import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import NextButtonWithDots from "../components/NextButtonWithDots";

const DisposableIncome = ({ navigation }) => {
  const [incomeItems, setIncomeItems] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const loadData = () => {
      const savedIncome = localStorage.getItem("incomeItems");
      const savedExpenses = localStorage.getItem("fixedExpenses");

      if (savedIncome) {
        setIncomeItems(JSON.parse(savedIncome));
      } else {
        setIncomeItems([
          { name: "SU", amount: 6000 },
          { name: "Work", amount: 2500 },
          { name: "Others", amount: 500 },
        ]);
      }

      if (savedExpenses) {
        setFixedExpenses(JSON.parse(savedExpenses));
      } else {
        setFixedExpenses([
          { name: "Rent", amount: 6000 },
          { name: "Electricity", amount: 2500 },
        ]);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Save incomeItems to localStorage whenever it changes
    localStorage.setItem("incomeItems", JSON.stringify(incomeItems));
  }, [incomeItems]);

  useEffect(() => {
    // Save fixedExpenses to localStorage whenever it changes
    localStorage.setItem("fixedExpenses", JSON.stringify(fixedExpenses));
  }, [fixedExpenses]);

  const handleIncomeChange = (index, field, value) => {
    const updated = [...incomeItems];
    updated[index][field] = field === "amount" ? parseInt(value) || 0 : value;
    setIncomeItems(updated);
  };

  const handleExpenseChange = (index, field, value) => {
    const updated = [...fixedExpenses];
    updated[index][field] = field === "amount" ? parseInt(value) || 0 : value;
    setFixedExpenses(updated);
  };

  const addIncome = () => {
    setIncomeItems([...incomeItems, { name: "", amount: 0 }]);
  };

  const addExpense = () => {
    setFixedExpenses([...fixedExpenses, { name: "", amount: 0 }]);
  };

  const removeIncome = (index) => {
    const updated = [...incomeItems];
    updated.splice(index, 1);
    setIncomeItems(updated);
  };

  const removeExpense = (index) => {
    const updated = [...fixedExpenses];
    updated.splice(index, 1);
    setFixedExpenses(updated);
  };

  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalFixed = fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
  const disposableIncome = totalIncome - totalFixed;

  useEffect(() => {
    const disposableIncome = totalIncome - totalFixed; // Calculate disposable income
    localStorage.setItem("disposableIncome", disposableIncome.toString());
    localStorage.setItem("totalBudget", disposableIncome.toString()); // Save as totalBudget
  }, [totalIncome, totalFixed]); // Update whenever income or expenses change

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/Pig/front_smile.png")}
          style={styles.piggy}
        />

        <Text style={styles.message}>
          We have located your monthly income {""}
          and fixed expenses. Please correct {""}
          them if they are wrong.
        </Text>

        <View style={styles.sectionGreen}>
          <Text style={styles.sectionTitle}>Income</Text>
          {incomeItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                value={item.name}
                onChangeText={(text) => handleIncomeChange(index, "name", text)}
                style={styles.inputName}
              />
              <TextInput
                value={item.amount.toString()}
                onChangeText={(text) =>
                  handleIncomeChange(index, "amount", text)
                }
                keyboardType="numeric"
                style={styles.inputAmount}
              />
              <TouchableOpacity onPress={() => removeIncome(index)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={addIncome} style={styles.addButton}>
            <Text style={styles.addText}>+ Add Income</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionRed}>
          <Text style={styles.sectionTitle}>Fixed expenses</Text>
          {fixedExpenses.map((item, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                value={item.name}
                onChangeText={(text) =>
                  handleExpenseChange(index, "name", text)
                }
                style={styles.inputName}
              />
              <TextInput
                value={item.amount.toString()}
                onChangeText={(text) =>
                  handleExpenseChange(index, "amount", text)
                }
                keyboardType="numeric"
                style={styles.inputAmount}
              />
              <TouchableOpacity onPress={() => removeExpense(index)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={addExpense} style={styles.addButton}>
            <Text style={styles.addText}>+ Add Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.summaryText}>
          Through calculations we can see that {""}
          your average monthly disposable income is as {""}
          follows:
        </Text>
        <TextInput
          style={styles.readonlyField}
          value={disposableIncome.toString()}
          editable={false}
        />
      </ScrollView>

      <NextButtonWithDots
        navigation={navigation}
        nextScreen="PigScreen"
        activeDotIndex={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  piggy: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontWeight: "500",
  },
  sectionGreen: {
    width: "100%",
    backgroundColor: "#9ee89e",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionRed: {
    width: "100%",
    backgroundColor: "#f89da1",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputName: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    padding: 4,
  },
  inputAmount: {
    width: 80,
    borderBottomWidth: 1,
    textAlign: "right",
    padding: 4,
  },
  remove: {
    color: "#900",
    marginLeft: 8,
    fontSize: 18,
  },
  addButton: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  addText: {
    color: "#333",
    fontWeight: "bold",
  },
  summaryText: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },
  readonlyField: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  dots: {
    fontSize: 22,
    color: "#69cc9c",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#69cc9c",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DisposableIncome;
