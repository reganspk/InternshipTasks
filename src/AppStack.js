import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/drawer';
import Practice from './Practice';
import Maps from './Components/Maps';
import AppPermissions from './Components/AppPermissions';
import Register from './Components/Register';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Task1" component={Task1} /> */}
      <Stack.Screen name="AppPerm" component={AppPermissions} />
      <Stack.Screen name="Map" component={Maps} />
      <Stack.Screen name="Home" component={Practice} />
      <Stack.Screen name="ADD USER" component={Register} />
      <Stack.Screen name="tabRoute" component={TabRoutes} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
