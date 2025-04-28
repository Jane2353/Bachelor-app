import {StyleSheet, View, Image, Text} from 'react-native';
import NextButtonWithDots from '../components/NextButtonWithDots';

const ExpensesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <Text style={styles.text}>Albert Filipsen</Text>
        </View>
      </View>
      <NextButtonWithDots
        navigation={navigation}
        nextScreen="PigScreen"
        activeDotIndex={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Ensures consistent spacing
  },
  content: {
    alignItems: 'center',
  },
});

export default ExpensesScreen;