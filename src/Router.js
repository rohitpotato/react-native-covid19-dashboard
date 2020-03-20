import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../src/screens/Main';
import SelectCountry from '../src/screens/SelectCountry';
import About from '../src/screens/About';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={({route}) => ({header: () => null})}
        name="Main"
        component={MyTabs}
      />
      <HomeStack.Screen
        options={({route}) => ({header: () => null})}
        name="SelectCountry"
        component={SelectCountry}
      />
    </HomeStack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}

export default HomeStackScreen;
