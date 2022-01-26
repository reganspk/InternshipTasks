import React, {useState} from 'react';

import {MenuProvider} from 'react-native-popup-menu';

import {Provider} from 'react-redux';
import {persistor, store} from './store';

import Practice from './Practice';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './Components/Register';
import {navigationRef, isReadyRef} from './navigationRoute';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import OTP from './Components/OTP';
import Task1 from './Components/Task1';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              {/* <Stack.Screen name="Task1" component={Task1} /> */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Practice} />
              <Stack.Screen name="ADD USER" component={Register} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
              <Stack.Screen name="Otp" component={OTP} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};

export default App;

{
  /* <MenuProvider>
   <AppWrapper />
 </MenuProvider>; */
}

/*  onReady={() => {
              isReadyRef.current = true;
              console.log(isReadyRef, navigationRef, 'From app');
            }} */
