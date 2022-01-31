import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

export default function AuthenticationPage() {
  const signoutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <Text>Auhentication Page</Text>
      <TouchableOpacity
        onPress={signoutHandler}
        style={{borderWidth: 2, borderColor: '#000', backgroundColor: '#000'}}>
        <Text style={{color: '#fff'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
