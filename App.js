import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './src/screens/frontScreen.js';
import MitidScreen from './src/screens/mitidScreen.js';
import ProfileScreen from './src/screens/profileScreen.js';
import { ConditionalFooter } from './src/components/footer.js';
import FileUploadScreen from './src/screens/FileUploadScreen.js';
import BudgetTracker from './src/screens/BudgetTracker.js';

const Stack = createStackNavigator();

// App.js
// ... (imports)

export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
         
          <Stack.Screen name="Login" component={MitidScreen} />

         <Stack.Screen name="Front" component={FrontScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} /> 
          <Stack.Screen name="FileUpload" component={FileUploadScreen} />
          <Stack.Screen name="BudgetTracker" component={BudgetTracker} />

        </Stack.Navigator>
        <ConditionalFooter />
      </NavigationContainer>
    
  );
}