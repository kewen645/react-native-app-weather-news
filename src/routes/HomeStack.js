import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import TakePhotoScreen from '../screens/Home/TakePhotoScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#00b38a'
          },
          headerTitleStyle: {
            color: 'white'
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('TakePhoto')}>
                <Text style={{fontSize: 18, color: 'white', marginRight: 10}}>
                  Take Photos
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} options />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
