import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './src/screens/frontScreen.js';
import MitidScreen from './src/screens/mitidScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={MitidScreen} />
        <Stack.Screen name="Front" component={FrontScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
