import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

import Expensess from '../expensesScreen/Expensess';
import ExpensessView from '../expensessViewScreesn/ExpensessView';
import CategoryCard from '../../components/homeComponent/CategoryCard';
import TotalExpensesCard from '../../components/homeComponent/TotalExpensesCard';
import PieChartComponent from '../../components/homeComponent/PieChart';
import BarCharts from '../../components/homeComponent/BarCharts';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <CategoryCard />
      <TotalExpensesCard />
      <PieChartComponent />
      <BarCharts />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Expensess') {
            iconName = 'attach-money';
          } else if (route.name === 'ExpensessView') {
            iconName = 'bar-chart';
          }

          // Return the appropriate icon using react-native-vector-icons
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#40a598',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f8f9fa' },
        headerShown: true, // Enable the header for all screens
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Screen' }}
      />
      <Tab.Screen
        name="Expensess"
        component={Expensess}
        options={{ title: 'Expenses' }} 
      />
      <Tab.Screen
        name="ExpensessView"
        component={ExpensessView}
        options={{ title: 'Expenses View'}} 
        
      />
    </Tab.Navigator>
  );
}
