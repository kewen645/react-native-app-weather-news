import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from '../screens/User';
import AboutScreen from '../screens/User/About';
import LoginScreen from '../screens/NoAuth/Login';
import RegisterScreen from '../screens/NoAuth/Register';
import CounterScreen from '../screens/NoAuth/Counter';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          },
          title: 'User'
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}
      />

      <Stack.Screen
        name="CounterScreen"
        component={CounterScreen}
        options={{
          title: 'Counter',
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
