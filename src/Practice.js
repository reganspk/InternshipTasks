import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DATA_ATTEMPT,
  getButtonAction,
  getDataAction,
} from './actions/actionSample';
import _ from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

const Practice = ({navigation}) => {
  const [abcde, setabcde] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.sampleReducer);
  const {response, isFetching, isSuccess} = selector;

  // console.log(response, 'response');
  const [bool, setBool] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    onRefresh();
  }, []);

  /* const onRefresh = () => {
    dispatch(getDataAction({}, {myUIChange: () => setabcde(true)}));
  }; */

  const onRefresh = () => {
    dispatch(
      getDataAction({
        myUIChange: () => {
          setabcde(true);
        },
      }),
    );
  };
  const signoutHandler = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  };
  useEffect(() => {
    console.log(isSuccess, isFetching);
    if (isSuccess && !isFetching) {
      setBool(true);
    }
  }, [isSuccess, isFetching]);
  const handleButton = () => {
    setabcde(false);
    dispatch({type: 'SET_MODAL_CLOSE'});
  };
  const model = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          flex: 1,
        }}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 50}}>
            Successfully Dispatched!!
          </Text>
        </View>
        <TouchableOpacity
          style={{backgroundColor: '#000', borderRadius: 5, padding: 10}}
          onPress={handleButton}>
          <Text style={{color: 'white', width: wp(10), textAlign: 'center'}}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{alignItems: 'center', backgroundColor: '#cbcbcb', flex: 1}}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 50}}>
        Users Data
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: 'black',
          padding: 5,
          borderRadius: 5,
          backgroundColor: 'black',
          marginVertical: 5,
        }}
        onPress={() => navigation.navigate('ADD USER')}>
        <Text style={{color: '#fff'}}>ADD USER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: 'black',
          padding: 5,
          borderRadius: 5,
          backgroundColor: 'black',
        }}
        onPress={signoutHandler}>
        <Text style={{color: '#fff'}}>SIGN OUT</Text>
      </TouchableOpacity>
      <ScrollView
        style={{
          flexGrow: 1,
          width: '80%',
          margin: 10,
        }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isFetching} />
        }>
        {isFetching ? (
          <Text>""</Text>
        ) : (
          <>
            {!_.isEmpty(response) &&
              response.map((data, index) => {
                return (
                  <View
                    style={{
                      paddingVertical: 10,
                      marginVertical: 10,
                      borderWidth: 1,
                      borderColor: '#000',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    key={index}>
                    {Object.entries(data).map((item, i) => {
                      console.log(item);
                      return (
                        <View key={i} style={{flexDirection: 'row'}}>
                          <Text style={{flex: 0.4, color: '#000'}}>
                            {item[0]}:
                          </Text>
                          <Text style={{flex: 0.8, color: '#000'}}>
                            {item[1]}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
          </>
        )}
      </ScrollView>
      {abcde && (
        <View style={{backgroundColor: '#d4f1f9'}}>
          <View>{model()}</View>
        </View>
      )}
    </View>
  );
};

export default Practice;
