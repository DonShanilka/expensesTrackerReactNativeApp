import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Expensess from '../expensesScreen/Expensess';
import ExpensessView from '../expensessViewScreesn/ExpensessView';
import CategoryCard from '../../components/homeComponent/CategoryCard';
import TotalExpensesCard from '../../components/homeComponent/TotalExpensesCard';
import PieChartComponent from '../../components/homeComponent/PieChart';
import BarCharts from '../../components/homeComponent/BarCharts';

// Home screen component
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <CategoryCard/>
      <TotalExpensesCard/>
      <PieChartComponent/>
      <BarCharts/>
    </View>
  );
}

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Expensess" component={Expensess} />
      <Tab.Screen name="ExpensessView" component={ExpensessView} />
    </Tab.Navigator>
  );
}

// App component wrapped with GestureHandlerRootView
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
