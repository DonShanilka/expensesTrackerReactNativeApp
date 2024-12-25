import * as React from 'react';
import { Text, View } from 'react-native';
import {createStaticNavigation,useNavigation,} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrfileScreen from '../profileScreen/PrfileScreen';
import Expensess from '../expensesScreen/Expensess';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ffffff'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Expensess: Expensess,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
