import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import userImage from '../images/profile-user.png';
import downArrow from '../images/down-arrow.png';
import user from '../images/user.png';
import email from '../images/email.png';
import lock from '../images/lock.png';
import dob from '../images/date-of-birth.png';
import calender from '../images/download.png';
import DateTimePicker from '@react-native-community/datetimepicker';

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
import {registerDataAction} from '../actions/actionSample';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Modalize} from 'react-native-modalize';
import {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import leftArrow from '../images/left-arrow.png';
import {SignUp} from '../apiSerivice';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function Register({navigation}) {
  const [imageUri, setImageUri] = useState('');
  const [registerData, setRegisterData] = useState({
    userType: '',
    userId: '',
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  console.log(show);
  const [date, setDate] = useState(new Date());
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const [text, setText] = useState('');
  const onchange = (event, selectedDate) => {
    if (event.type === 'set') {
      setShow(false);
      setDate(selectedDate);
      /*  setText(new Date(selectedDate).toLocaleDateString()); */
      setText(moment(new Date(selectedDate)).format('YYYY-MM-DD'));
    } else if (event.type === 'dismissed') {
      setShow(false);
      setDate(new Date());
    }
  };
  const openGallery = () => {
    console.log('hello');
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      console.log('response = ');
      if (res.didCancel) {
        console.log('User has cancelled');
      } else if (res.error) {
        console.log('Image Picker Error');
      } else if (res.customButton) {
        console.log('User tapped custom Button');
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + res.assets[0].base64};
        setImageUri(source);
      }
    });
  };
  const registerHandle = () => {
    SignUp(registerData.email, registerData.password)
      .then(data => {
        alert(data);
      })
      .catch(err => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: hp(7),

          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',

            width: wp(10),
            marginHorizontal: 20,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={{height: hp(5), width: wp(10)}} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={{color: 'black', fontSize: 40}}>Register</Text>
            </View>
            <TouchableOpacity onPress={onOpen} style={{paddingVertical: 15}}>
              <Image
                source={imageUri === '' ? userImage : imageUri}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                }}
              />
              <Text
                style={{
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Profile
              </Text>
            </TouchableOpacity>
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

                      width: wp(40),
                    }}>
                    <View>
                      <Text>
                        {registerData.userType
                          ? registerData.userType
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
                      setRegisterData({...registerData, userType: 'Teacher'})
                    }
                  />
                  <MenuOption
                    text="student"
                    onSelect={() =>
                      setRegisterData({
                        ...registerData,
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
                style={{flex: 1}}
                onChangeText={text =>
                  setRegisterData({
                    ...registerData,
                    userId: text,
                  })
                }
              />
            </View>
            <View style={styles.textBox}>
              <Image
                source={user}
                style={{width: 20, height: 20, marginHorizontal: 5}}
              />
              <TextInput
                placeholder="User Name"
                style={{flex: 1}}
                onChangeText={text =>
                  setRegisterData({
                    ...registerData,
                    name: text,
                  })
                }
              />
            </View>
            <View style={styles.dob}>
              <Image
                source={dob}
                style={{width: 20, height: 20, marginHorizontal: 5}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  paddingHorizontal: 10,
                }}
                onPress={() => setShow(true)}>
                <Text>{text === '' ? 'Date Of Birth' : text}</Text>
                <Image source={calender} style={{width: 20, height: 20}} />
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onchange}
                maximumDate={new Date()}
              />
            )}
            {/*  <TouchableOpacity style={{borderWidth: 1, borderColor: '#000'}}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              styles={{
                container: {
                  padding: 0,
                  margin: 0,
                  color: '#000',
                  width: wp('80%'),
                  height: wp('10%'),
                },
                row: {
                  backgroundColor: 'rgba(0,0,0,.9)',
                  flexDirection: 'row',
                  color: '#fff',
                  borderRadius: 5,
                },
                textInput: {
                  padding: 0,
                  color: '#000',
                  height: '100%',

                  borderWidth: 1,
                  borderColor: '#000',
                  fontSize: 20,
                  flex: 1,
                  zIndex: 999,
                },

                poweredContainer: {
                  display: 'none',
                },
                description: {
                  color: '#fff',
                },
              }}
              enablePoweredByContainer={false}
              query={{
                key: 'AIzaSyAKLUx_rnltQ2u9Xr39DcpX3UdRr293gCU',
                language: 'en',
                components: 'country:np',
              }}
            />
          </TouchableOpacity> */}
            <View style={styles.textBox}>
              <Image
                source={email}
                style={{width: 20, height: 20, marginHorizontal: 5}}
              />

              <TextInput
                placeholder="Email"
                style={{flex: 1}}
                onChangeText={text =>
                  setRegisterData({
                    ...registerData,
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
                style={{flex: 1}}
                onChangeText={text =>
                  setRegisterData({
                    ...registerData,
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
              }}
              onPress={registerHandle}>
              <Text
                style={{
                  color: '#fff',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 20,
                }}>
                Register
              </Text>
            </TouchableOpacity>

            {/*  <TouchableOpacity
            style={{
              marginVertical: 20,
              backgroundColor: 'black',
              borderRadius: 5,
            }}
            onPress={() => {
              console.log(registerData);
              showMessage({
                message: 'Youe have just Clicked Register',
                type: 'info',
              });
              dispatch(registerDataAction(registerData));
            }}>
            <Text
              style={{
                color: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontSize: 20,
              }}>
              Register
            </Text>
          </TouchableOpacity> */}
          </View>
        </View>

        <Modalize ref={modalizeRef} modalHeight={hp(30)}>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', paddingVertical: 30}}>
              <Image
                source={imageUri === '' ? userImage : imageUri}
                style={{height: 90, width: 90, borderRadius: 90}}
              />
            </View>
            <LinearGradient
              start={{x: 0, y: 0, z: 0}}
              end={{x: 1, y: 0}}
              colors={['#eb9234', '#eb9e34', '#ebcf34']}
              style={{
                alignItems: 'center',

                width: '80%',

                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={openGallery}>
                <Text
                  style={{color: 'white', fontSize: 20, paddingVertical: 15}}>
                  Choose Image From your Gallery
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modalize>
        <FlashMessage position="top" />
      </ScrollView>
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
  dob: {
    alignItems: 'center',

    backgroundColor: '#fff',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 15,
  },
});
