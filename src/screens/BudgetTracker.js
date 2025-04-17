import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [lockedDays, setLockedDays] = useState([]);
    const [uploadedData, setUploadedData] = useState([]);

    useEffect(() => {
        const loadUploadedData = async () => {
            const data = await AsyncStorage.getItem('bankData');
            if (data) {
                setUploadedData(JSON.parse(data));
            }
        };

        loadUploadedData();
    }, []);

    const distributeBudget = (budget) => {
        const budgetFloat = parseFloat(budget);
        if (isNaN(budgetFloat)) return;

        const activeDays = days.filter(day => !lockedDays.includes(day));
        const perDay = (budgetFloat / activeDays.length).toFixed(2);
        const newDailyBudget = {};

        days.forEach(day => {
            if (!lockedDays.includes(day)) {
                newDailyBudget[day] = parseFloat(perDay);
            } else {
                newDailyBudget[day] = dailyBudget[day] || 0;
            }
        });

        setDailyBudget(newDailyBudget);
        setRemainingBudget(budgetFloat);
    };

    const handleBudgetChange = (budget) => {
        setWeeklyBudget(budget);
        distributeBudget(budget);
    };

    const handleAddExpense = () => {
        if (selectedDay && amount) {
            const expenseAmount = parseFloat(amount);
            if (isNaN(expenseAmount)) return;

            setExpenses(prev => ({
                ...prev,
                [selectedDay]: [
                    ...(prev[selectedDay] || []),
                    { amount: expenseAmount.toFixed(2), category: selectedCategory }
                ]
            }));

            setDailyBudget(prev => ({
                ...prev,
                [selectedDay]: (parseFloat(prev[selectedDay]) - expenseAmount).toFixed(2)
            }));

            setRemainingBudget(prev => (parseFloat(prev) - expenseAmount).toFixed(2));
            setAmount('');
        }
    };

    const toggleLockDay = (day) => {
        let updatedLockedDays = [];
        if (lockedDays.includes(day)) {
            updatedLockedDays = lockedDays.filter(d => d !== day);
        } else {
            updatedLockedDays = [...lockedDays, day];
            const remaining = parseFloat(dailyBudget[day] || 0);
            const openDays = days.filter(d => !updatedLockedDays.includes(d));
            if (openDays.length > 0) {
                const distributeAmount = (remaining / openDays.length).toFixed(2);
                const newDailyBudget = { ...dailyBudget };
                openDays.forEach(d => {
                    newDailyBudget[d] = (parseFloat(newDailyBudget[d] || 0) + parseFloat(distributeAmount)).toFixed(2);
                });
                newDailyBudget[day] = 0;
                setDailyBudget(newDailyBudget);
            }
        }
        setLockedDays(updatedLockedDays);
    };

    const getBudgetStyle = (value) => {
        const numeric = parseFloat(value);
        return {
            color: numeric < 0 ? 'red' : numeric > 0 ? 'green' : 'black',
            fontWeight: 'bold',
            fontSize: 12,
            textAlign: 'center'
        };
    };

    const categorizeTransaction = (transaction) => {
        // Logic to categorize transactions based on user input
        // Example: Assign categories to deposits/withdrawals
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
                    <View key={day} style={styles.dayContainer}>
                        <TouchableOpacity 
                            style={[
                                styles.dayButton, 
                                selectedDay === day && styles.selectedDay
                            ]} 
                            onPress={() => setSelectedDay(day)}
                        >
                            <Text style={styles.dayText}>{day}</Text>
                            <Text style={getBudgetStyle(dailyBudget[day])}>
                                ({dailyBudget[day] || 0} kr)
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.lockButton, 
                                lockedDays.includes(day) && styles.locked
                            ]}
                            onPress={() => toggleLockDay(day)}
                        >
                            <Text style={styles.lockText}>
                                {lockedDays.includes(day) ? '🔒' : '🔓'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Indtast beløb"
                value={amount}
                onChangeText={setAmount}
            />
            {lockedDays.includes(selectedDay) && (
                <Text style={{ color: 'red', marginBottom: 8 }}>
                    Du kan ikke tilføje forbrug på en låst dag
                </Text>
            )}

            <FlatList
                data={categories}
                keyExtractor={item => item}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[
                            styles.categoryButton, 
                            selectedCategory === item && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <Button 
                title={lockedDays.includes(selectedDay) ? "Dagen er låst" : "Tilføj forbrug"}
                onPress={handleAddExpense}
                disabled={lockedDays.includes(selectedDay) || !selectedDay}
            />

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

            <Text style={styles.header}>Uploaded Transactions</Text>
            <FlatList
                data={uploadedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.transaction}>
                        <Text>{item.type}: {item.amount} kr</Text>
                        <Text>{item.date}</Text>
                        <Button title="Categorize" onPress={() => categorizeTransaction(item)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 15, paddingVertical: 20 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    budgetInput: { borderWidth: 1, padding: 6, width: 100, borderRadius: 5, textAlign: 'center' },
    remainingBudget: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    daysRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
    dayContainer: { alignItems: 'center', marginHorizontal: 3 },
    dayButton: { padding: 6, backgroundColor: '#ddd', borderRadius: 5, width: screenWidth / 8, alignItems: 'center' },
    selectedDay: { backgroundColor: '#4CAF50' },
    dayText: { fontSize: 12, textAlign: 'center' },
    lockButton: { marginTop: 4 },
    lockText: { fontSize: 16 },
    locked: { opacity: 0.5 },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
    categoryButton: { padding: 4, backgroundColor: '#ddd', marginHorizontal: 3, borderRadius: 5, minWidth: 80, alignItems: 'center' },
    selectedCategory: { backgroundColor: '#4CAF50' },
    categoryText: { fontSize: 12, textAlign: 'center' },
    expenseText: { fontSize: 14, marginVertical: 2, fontWeight: 'bold' },
    expenseDetail: { fontSize: 12, marginLeft: 10 },
    transaction: { marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
});

export default BudgetTracker;
