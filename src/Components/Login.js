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
import userImg from '../images/user.png';
import email from '../images/email.png';
import lock from '../images/lock.png';
import {google, facebook} from '../images';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AuthenticationPage from './AuthenticationPage';
import Practice from '../Practice';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import {SignIn} from '../apiSerivice';
import {
  GraphRequest,
  AccessToken,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
GoogleSignin.configure({
  webClientId:
    '650889095127-3kq9l5e19f2hcgb9va287d7lc732dr7q.apps.googleusercontent.com',
});

export default function Login({navigation}) {
  const [loginData, setLoginData] = useState({
    userType: '',
    userId: '',
    email: '',
    password: '',
  });

  const [user, setUser] = useState();
  const [bool, setBool] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);
    console.log(user, 'login');
  }

  //Google Sign in Process

  const googleSignIn = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  useEffect(() => {
    if (user) {
      console.log(user, 'user');
      navigation.navigate('Practice');
    }
  }, [user]);

  if (initializing) return null;

  const signInHandle = () => {
    console.log(loginData.email);
    SignIn(loginData.email, loginData.password);
  };
  /* Facebook Signin */

  const facebookSignIn = async () => {
    console.log('Facebook login');
    try {
      LoginManager.logOut();
      LoginManager.setLoginBehavior('web_only');
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
          console.log('result', result);
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            console.log(result);
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken.toString();
              getInfoFromToken(accessToken);
            });
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error);
        },
      );
    } catch (error) {
      console.log('Login fail with error: ' + error);
    }
  };
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,picture.type(large),email',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
        } else {
          console.log(user);
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  return (
    <View style={styles.container}>
      <>
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

                      width: wp(40),
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
                source={userImg}
                style={{width: 20, height: 20, marginHorizontal: 5}}
              />
              <TextInput
                placeholder="User ID"
                style={{flex: 1}}
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
                style={{flex: 1}}
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
                style={{flex: 1}}
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
              onPress={signInHandle}
              style={{
                marginVertical: 20,
                backgroundColor: 'black',
                borderRadius: 5,
              }}
              disabled={
                loginData.email === '' && loginData.password === ''
                  ? true
                  : false
              }>
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
            <TouchableOpacity
              style={[
                {
                  flexDirection: 'row',
                  borderColor: '#000',
                  borderWidth: 0.5,
                  padding: 5,
                  marginVertical: 10,
                  paddingHorizontal: 13,
                },
                styles.loginBox,
              ]}
              onPress={googleSignIn}>
              <Image
                source={google}
                style={[
                  {
                    height: hp(3),
                    width: wp(6),
                    resizeMode: 'cover',
                  },
                ]}
              />
              <Text style={{paddingLeft: 5}}>Signin with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flexDirection: 'row',
                  borderColor: '#000',
                  borderWidth: 0.5,
                  padding: 5,
                },
                styles.loginBox,
              ]}
              onPress={facebookSignIn}>
              <Image
                source={facebook}
                style={{
                  height: hp(3),
                  width: wp(6),
                  resizeMode: 'cover',
                }}
              />
              <Text style={{paddingLeft: 3}}>Signin with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={{
              borderColor: '#000',
              borderWidth: 1,
              height: hp(5),
              width: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
            }}>
            <Text color="#000"> Show Map</Text>
          </TouchableOpacity>
        </View>

        {/*  {bool && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      )} */}
      </>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loginBox: {
    borderRadius: 5,
  },
});
