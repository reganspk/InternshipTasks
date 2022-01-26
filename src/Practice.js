import axios from 'axios';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDataAction} from './actions/actionSample';
import _ from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Practice = ({navigation}) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.sampleReducer);
  const {response, isFetching} = selector;
  // console.log(response, 'response');

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    dispatch(getDataAction());
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
        }}
        onPress={() => navigation.navigate('ADD USER')}>
        <Text style={{color: '#fff'}}>ADD USER</Text>
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
          !_.isEmpty(response) &&
          response.map((data, index) => {
            console.log(data, 'asfjsld');
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
                      <Text style={{flex: 0.4, color: '#000'}}>{item[0]}:</Text>
                      <Text style={{flex: 0.8, color: '#000'}}>{item[1]}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Practice;
