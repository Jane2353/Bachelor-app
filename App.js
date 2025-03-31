import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './src/screens/frontScreen.js';
import MitidScreen from './src/screens/mitidScreen.js';
import BudgetTracker from './src/screens/BudgetTracker.js';
import ProfileScreen from './src/screens/profileScreen.js';
import AccountSetupScreen from './src/screens/accountSetupScreen.js';
import { ConditionalFooter } from './src/components/footer.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={MitidScreen} />
        <Stack.Screen name="AccountSetup" component={AccountSetupScreen} />
        <Stack.Screen name="Budget" component={BudgetTracker} />
        <Stack.Screen name="Front" component={FrontScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <ConditionalFooter />
    </NavigationContainer>
  );
}