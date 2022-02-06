import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import OTP from './Components/OTP';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Task1" component={Task1} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ADD USER" component={Register} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={OTP} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
