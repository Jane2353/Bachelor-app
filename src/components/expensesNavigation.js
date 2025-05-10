import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExpensesNavigation = ({ activeScreen }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={[
          styles.button,
          activeScreen === "AllExpensesOverview"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => navigation.navigate("AllExpensesOverview")}
      >
        <Text
          style={[
            styles.buttonText,
            activeScreen === "AllExpensesOverview"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Expenses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeScreen === "Overview"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => navigation.navigate("Overview")}
      >
        <Text
          style={[
            styles.buttonText,
            activeScreen === "Overview"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Category
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
    gap: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 6,
    width: 120,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "black",
  },
  inactiveButton: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonText: {
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "black",
  },
});

export default ExpensesNavigation;
