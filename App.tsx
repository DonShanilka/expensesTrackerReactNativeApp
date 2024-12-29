
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Regiter from './screens/registerScreen/Regiter';
import Login from './screens/loginScreen/Login';
import HomeScreen from './screens/homeScreen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import RootNavigator from './src/navigation/RootNavigator';

function App() {
  
  const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Regiter} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <HomeScreen/>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     <RootNavigatore />
    //   </NavigationContainer>
    // </GestureHandlerRootView>
  );
}

export default App;
