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
import {useEffect} from 'react';
import Maps from './Components/Maps';
import AppPermissions from './Components/AppPermissions';
import RNBootSplash from 'react-native-bootsplash';
const Stack = createNativeStackNavigator();
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';
import TabRoutes from './Components/TabRoutes';
const App = () => {
  useEffect(() => {
    console.log('hudai xa');
    const init = async () => {
      // …do multiple sync or async tasks
      console.log('alik bati');
    };

    init().finally(async () => {
      console.log('aayenah');
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  const requestPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(response => {
      console.log(response);
    });
  };
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              {/* <Stack.Screen name="Task1" component={Task1} /> */}
              <Stack.Screen name="AppPerm" component={AppPermissions} />
              <Stack.Screen name="Map" component={Maps} />
              <Stack.Screen name="Practice" component={Practice} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Practice} />
              <Stack.Screen name="ADD USER" component={Register} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
              <Stack.Screen name="Otp" component={OTP} />
              <Stack.Screen name="tabRoute" component={TabRoutes} />
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
