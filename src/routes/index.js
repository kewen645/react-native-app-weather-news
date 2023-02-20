import React from 'react';
import HomeStack from './HomeStack';
import NewsStack from './NewsStack';
import UserStack from './UserStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="User"
        component={UserStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
