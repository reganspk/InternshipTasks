import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../images/home.png';
import Home1 from '../images/home1.png';
import exit from '../images/exit.png';
import exit1 from '../images/exit1.png';
import authentication from '../images/authentication.png';
import authentication1 from '../images/authentication.png';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Practice from '../Practice';
import AuthenticationPage from './AuthenticationPage';
const Tab = createBottomTabNavigator();
export default function TabRoutes() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{tabBarVisible: true, headerShown: false}}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'black',
          style: {
            height: Platform.OS === 'android' ? hp(7) : hp(10),
          },
          labelStyle: {
            fontSize: wp(2.5),
            paddingBottom: hp(1),
            fontFamily: 'bold',
          },
        }}>
        <Tab.Screen
          name="Practice"
          component={Practice}
          options={{
            tabBarLabel: 'Authentications',
            tabBarIcon: ({color, focused, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: hp(5),
                  width: wp(5),
                  tintColor: focused ? 'orange' : 'black',
                  marginTop: hp(1),
                }}
                source={focused ? Home : Home1}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Authentication"
          component={AuthenticationPage}
          options={{
            tabBarIcon: ({color, focused, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: wp(5),
                  width: wp(5),
                  tintColor: focused ? 'orange' : 'black',
                  marginTop: hp(1),
                }}
                source={focused ? authentication : authentication1}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
