import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCZksF5OI09chjv5QQLurimebcBDLblLCE',
  authDomain: 'newproject-bc624.firebaseapp.com',
  projectId: 'newproject-bc624',
  storageBucket: 'newproject-bc624.appspot.com',
  messagingSenderId: '650889095127',
  appId: '1:650889095127:web:0df05e377e8a1cda008d92',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, Auth};
export default function Setup() {
  return <App />;
}

const styles = StyleSheet.create({});
