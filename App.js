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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={MitidScreen} />
        <Stack.Screen name="choosePigScreen" component={ChoosePigScreen} screenOptions= {{ headerShown: false}} />
        <Stack.Screen name="PigScreen" component={PigScreen} />
        <Stack.Screen name="PigShopScreen" component={PigShopScreen} />
        <Stack.Screen name="PigChallengeScreen" component={PigChallengeScreen} />
        <Stack.Screen name="Overview" component={OverviewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <ConditionalFooter />
    </NavigationContainer>
  );
}
