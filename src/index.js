import {StyleSheet} from 'react-native';
import React from 'react';
import MainTab from './routes';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/NoAuth/Login';
import RegisterScreen from './screens/NoAuth/Register';
import SplashScreen from './screens/NoAuth/Splash';

const Stack = createNativeStackNavigator();

export default function index() {
  const {isLogin, userInfo} = useSelector(state => state.auth.value);
  console.log(isLogin, userInfo);

  return (
    <>
      {isLogin ? (
        <MainTab />
      ) : (
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
