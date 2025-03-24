import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const categories = ['Mad', 'Bolig', 'Transport', 'Fritid', 'Husholdning', 'Andre'];
const screenWidth = Dimensions.get('window').width;

const BudgetTracker = () => {
    const [weeklyBudget, setWeeklyBudget] = useState('');
    const [dailyBudget, setDailyBudget] = useState({});
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [expenses, setExpenses] = useState({});

    const distributeBudget = (budget) => {
        const dailyAmount = budget ? (parseFloat(budget) / 7).toFixed(2) : '';
        const newDailyBudget = {};
        days.forEach(day => {
            newDailyBudget[day] = parseFloat(dailyAmount);
        });
        setDailyBudget(newDailyBudget);
        setRemainingBudget(parseFloat(budget));
    };

    const handleBudgetChange = (budget) => {
        setWeeklyBudget(budget);
        distributeBudget(budget);
    };

    const handleAddExpense = () => {
        if (selectedDay && amount) {
            const expenseAmount = parseFloat(amount).toFixed(2);
            setExpenses(prev => ({
                ...prev,
                [selectedDay]: [
                    ...(prev[selectedDay] || []),
                    { amount: expenseAmount, category: selectedCategory }
                ]
            }));
            
            setDailyBudget(prev => ({
                ...prev,
                [selectedDay]: (prev[selectedDay] - expenseAmount).toFixed(2)
            }));
            
            setRemainingBudget(prev => (prev - expenseAmount).toFixed(2));
            setAmount('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Ugens Budget:</Text>
                <TextInput
                    style={styles.budgetInput}
                    keyboardType="numeric"
                    placeholder="Sæt budget"
                    value={weeklyBudget}
                    onChangeText={handleBudgetChange}
                />
            </View>
            <Text style={styles.remainingBudget}>Resterende Budget: {remainingBudget} kr</Text>
            
            <View style={styles.daysRow}>
                {days.map(day => (
                    <TouchableOpacity 
                        key={day} 
                        style={[styles.dayButton, selectedDay === day && styles.selectedDay]} 
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={styles.dayText}>{day}</Text>
                        <Text style={styles.dayText}>({dailyBudget[day] || 0} kr)</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Indtast beløb"
                value={amount}
                onChangeText={setAmount}
            />
            
            <FlatList
                data={categories}
                keyExtractor={item => item}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <Button title="Tilføj forbrug" onPress={handleAddExpense} />

            <FlatList
                data={days}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.expenseText}>{item}:</Text>
                        {(expenses[item] || []).map((expense, index) => (
                            <Text key={index} style={styles.expenseDetail}>
                                {expense.category}: {expense.amount} kr
                            </Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 15, paddingVertical: 20 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    header: { fontSize: 18, fontWeight: 'bold' },
    budgetInput: { borderWidth: 1, padding: 6, width: 100, borderRadius: 5, textAlign: 'center' },
    remainingBudget: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    daysRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
    dayButton: { padding: 6, backgroundColor: '#ddd', borderRadius: 5, margin: 3, width: screenWidth / 7, alignItems: 'center' },
    selectedDay: { backgroundColor: '#4CAF50' },
    dayText: { fontSize: 12, textAlign: 'center' },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
    categoryButton: { padding: 4, backgroundColor: '#ddd', marginHorizontal: 3, borderRadius: 5, minWidth: 80, alignItems: 'center' },
    selectedCategory: { backgroundColor: '#4CAF50' },
    categoryText: { fontSize: 12, textAlign: 'center' },
    expenseText: { fontSize: 14, marginVertical: 2, fontWeight: 'bold' },
    expenseDetail: { fontSize: 12, marginLeft: 10 }
});

export default BudgetTracker;
