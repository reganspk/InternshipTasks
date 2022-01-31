import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftArrow from '../images/left-arrow.png';

export default function OTP({navigation}) {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const submit = useRef();

  const [code, setCode] = useState({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  });

  const otpHandle = () => {
    console.log(code);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',

          width: wp(10),
          marginHorizontal: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Image source={leftArrow} style={{height: hp(5), width: wp(10)}} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 40,
          paddingLeft: 30,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 40, color: 'green'}}>Have OTP ?</Text>
      </View>
      <View
        style={{
          alignItems: 'center',

          paddingLeft: 10,
          flexDirection: 'row',
        }}>
        <TextInput
          maxLength={1}
          style={styles.otpBox}
          keyboardType="numeric"
          onChangeText={text => {
            setCode({
              ...code,
              code0: text,
            });
            if (text !== '') {
              input2.current.focus();
            }
          }}
          ref={input1}
          onSubmitEditing={() => input2.current.focus()}
          onkeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              input1.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          ref={input2}
          onChangeText={text => {
            setCode({
              ...code,
              code1: text,
            });
            if (text !== '') {
              input3.current.focus();
            }
          }}
          onSubmitEditing={() => input3.current.focus()}
          onkeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              input2.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => {
            setCode({...code, code2: text});
            if (text !== '') {
              input4.current.focus();
            }
          }}
          ref={input3}
          onSubmitEditing={() => input4.current.focus()}
          onkeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              input3.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => {
            setCode({...code, code3: text});
            if (text !== '') {
              input5.current.focus();
            }
          }}
          ref={input4}
          maxLength={1}
          onSubmitEditing={() => input5.current.focus()}
          onkeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              input4.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => {
            setCode({...code, code4: text});
            if (text !== '') {
              input6.current.focus();
            }
          }}
          ref={input5}
          onSubmitEditing={() => input6.current.focus()}
          onKeyPress={({nativeEvent}) => {
            console.log(nativeEvent.key);
            if (nativeEvent.key === 'Backspace') {
              input4.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => {
            setCode({...code, code5: text});
            if (text !== '') {
              submit.current.focus();
            }
          }}
          ref={input6}
          onSubmitEditing={() => submit.current.focus()}
          onkeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              input5.current.focus();
            }
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginVertical: 40}}>
        <TouchableOpacity
          ref={submit}
          style={{backgroundColor: '#5eb80b', borderRadius: 10}}>
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              paddingHorizontal: 40,
              paddingVertical: 10,
            }}
            onPress={otpHandle}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#000',
    width: 50,
    borderRadius: 10,
    marginHorizontal: 8,
    textAlign: 'center',
  },
});
