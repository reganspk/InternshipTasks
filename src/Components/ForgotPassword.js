import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import rightArrow from '../images/right-arrow.png';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const submitHandle = () => {
    console.log(email);
    navigation.navigate('Otp');
  };
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 40, marginHorizontal: 20}}>
        <Text style={{fontSize: 20}}>Did you forgot your password ?</Text>
        <TextInput
          style={{
            fontSize: 15,
            borderWidth: 1,
            borderColor: '#000',
            marginVertical: 15,
            borderRadius: 10,
          }}
          placeholder="Email Address"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            paddingVertical: 10,
            borderRadius: 5,
            paddingHorizontal: 70,
          }}
          onPress={submitHandle}>
          <Image
            style={{width: 30, height: 20, tintColor: '#fff'}}
            source={rightArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
