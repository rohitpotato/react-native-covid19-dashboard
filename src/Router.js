import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../src/screens/Main';
import SelectCountry from '../src/screens/SelectCountry';
import About from '../src/screens/About';
import News from '../src/screens/News';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = 'earth-box';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'About') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
          if (route.name === 'News') {
            iconName = 'newspaper';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: '#a3bded',
        inactiveTintColor: 'gray',
        labelStyle: {fontFamily: 'Rubik-Medium'},
        style: {backgroundColor: '#e2ebf0'},
      }}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}

export default HomeStackScreen;
