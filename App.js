import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OverviewScreen from './src/screens/overviewScreen.js';
import PigScreen from './src/screens/pigScreen';
import PigShopScreen from './src/screens/pigShopScreen';
import PigChallengeScreen from './src/screens/pigChallengeScreen';
import ProfileScreen from './src/screens/profileScreen.js';
import { ConditionalFooter } from './src/components/footer.js';
import MitidScreen from './src/screens/mitidScreen.js';
import ChoosePigScreen from './src/screens/choosePigScreen.js';
import ExpensesScreen from './src/screens/expensesScreen.js';
import PigCategorise from './src/screens/pigCategorise.js';
import AllExpensesOverviewScreen from './src/screens/AllExpensesOverview.js';
import UncategorisedScreen from './src/screens/UncategorisedScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={MitidScreen} />
        <Stack.Screen name="choosePigScreen" component={ChoosePigScreen} />
        <Stack.Screen name="ExpensesScreen" component={ExpensesScreen} />
        <Stack.Screen name="PigScreen" component={PigScreen} />
        <Stack.Screen name="PigChallengeScreen" component={PigChallengeScreen} />
        <Stack.Screen name="PigShopScreen" component={PigShopScreen} /> 
        <Stack.Screen name="Overview" component={OverviewScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        <Stack.Screen name="PigCategorise" component={PigCategorise} />
        <Stack.Screen name="AllExpensesOverview" component={AllExpensesOverviewScreen} />
        <Stack.Screen name="Uncategorised" component={UncategorisedScreen} />
      </Stack.Navigator>
      <ConditionalFooter />
    </NavigationContainer>
  );
}
