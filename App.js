import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OverviewScreen from './src/screens/overviewScreen.js';
import PigScreen from './src/screens/pigScreen.js';
import ProfileScreen from './src/screens/profileScreen.js';
import { ConditionalFooter } from './src/components/footer.js';
import MitidScreen from './src/screens/mitidScreen.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={MitidScreen} />
        <Stack.Screen name="Pig" component={PigScreen} />
        <Stack.Screen name="Overview" component={OverviewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <ConditionalFooter />
    </NavigationContainer>
  );
}