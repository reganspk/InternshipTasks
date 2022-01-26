import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import userImage from '../images/profile-user.png';
import downArrow from '../images/down-arrow.png';
import user from '../images/user.png';
import email from '../images/email.png';
import lock from '../images/lock.png';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {navigate} from '../navigationRoute';
export default function Login({navigation}) {
  const [loginData, setLoginData] = useState({
    userType: '',
    userId: '',
    email: '',
    password: '',
  });
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 20,
            backgroundColor: '#fff',
            width: '80%',
            borderWidth: 1,
            borderColor: 'black',
            marginVertical: 10,
            borderRadius: 10,
          }}>
          <View style={{marginBottom: 30}}>
            <Text style={{color: 'black', fontSize: 50}}>Login</Text>
          </View>
          <View style={styles.userType}>
            <Image source={userImage} style={{width: 20, height: 20}} />
            <Menu style={{flexDirection: 'row'}}>
              <MenuTrigger
                style={{
                  paddingHorizontal: 5,
                  fontWeight: 'bold',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    width: wp(35),
                  }}>
                  <View>
                    <Text>
                      {loginData.userType
                        ? loginData.userType
                        : 'Choose who you are ?'}
                    </Text>
                  </View>
                  <Image style={{height: 20, width: 15}} source={downArrow} />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  text="Teacher"
                  onSelect={() =>
                    setLoginData({...loginData, userType: 'Teacher'})
                  }
                />
                <MenuOption
                  text="Student"
                  onSelect={() =>
                    setLoginData({
                      ...loginData,
                      userType: 'Student',
                    })
                  }
                />
              </MenuOptions>
            </Menu>
          </View>
          <View style={styles.textBox}>
            <Image
              source={user}
              style={{width: 20, height: 20, marginHorizontal: 5}}
            />
            <TextInput
              placeholder="User ID"
              onChangeText={text =>
                setLoginData({
                  ...loginData,
                  userId: text,
                })
              }
            />
          </View>
          <View style={styles.textBox}>
            <Image
              source={email}
              style={{width: 20, height: 20, marginHorizontal: 5}}
            />
            <TextInput
              placeholder="Email"
              onChangeText={text =>
                setLoginData({
                  ...loginData,
                  email: text,
                })
              }
              keyboardType="email-address"
            />
          </View>
          <View style={styles.textBox}>
            <Image
              source={lock}
              style={{width: 20, height: 20, marginHorizontal: 5}}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text =>
                setLoginData({
                  ...loginData,
                  password: text,
                })
              }
            />
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 20,
              backgroundColor: 'black',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontSize: 20,
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text>Already Have an Account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ADD USER')}>
              <Text style={{color: '#4542f5', paddingHorizontal: 10}}>
                Click Here !
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 15}}>
            <Text>Do you Forget your Password ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={{color: '#4542f5', paddingHorizontal: 10}}>
                Click Here !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b8a66',
  },
  userType: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  textBox: {
    alignItems: 'center',

    backgroundColor: '#fff',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
