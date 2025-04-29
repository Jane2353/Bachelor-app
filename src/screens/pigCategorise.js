import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const PigCategorise = () => {
  const expenses = [
    { date: '16/04', description: 'AAU', amount: '15,-' },
    { date: '16/04', description: 'AAU', amount: '200,-' },
    { date: '16/04', description: 'H&M', amount: '520,-' },
  ];

  const renderExpense = ({ item }) => (
    <View style={styles.expenseRow}>
      <View style={styles.expenseData}>
        <Text style={styles.expenseText}>{item.date}</Text>
        <Text style={styles.expenseText}>{item.description}</Text>
        <Text style={styles.expenseText}>{item.amount}</Text>
      </View>
      <TouchableOpacity style={styles.categoriseButton}>
        <Text style={styles.categoriseButtonText}>Categorise</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.pigIcon}
          source={require('../../assets/Pig/side_worried_transparent.png')}
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechBubbleText}>
            I am getting worried! You have uncategorised expenses
          </Text>
          <View style={styles.speechBubbleTail} />
        </View>
      </View>
      <Text style={styles.instructionText}>
        Click on the expenses in order to categorise them
      </Text>
      <View style={styles.topLine} />
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item, index) => index.toString()}
        style={styles.expensesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  pigIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: '20%',
  },
  speechBubble: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FE9894',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FE9894',
    flex: 1,
    position: 'relative',
    marginTop: '20%',
    },
  speechBubbleText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: '10%',
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FE9894',
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  expensesList: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE9894',
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  expenseData: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  expenseText: {
    fontSize: 14,
    color: 'black',
  },
  categoriseButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoriseButtonText: {
    fontSize: 14,
    color: 'black',
  },
});

export default PigCategorise;
