import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from './screens/loginScreen/Login';
import Register from './screens/registerScreen/Regiter';
import MyTabs from './screens/homeScreen/HomeScreen'; // Your bottom tab navigator
import { Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        setIsLoggedIn(!!userEmail);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Placeholder for a loading screen */}
        <Text>Loading...</Text>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="Home" component={MyTabs} />
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
