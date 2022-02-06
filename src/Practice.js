import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  StyleSheet,
  Image,
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
import close from './images/close.png';

const Practice = ({navigation}) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.sampleReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const {response, isFetching, isSuccess} = selector;

  // console.log(response, 'response');

  useEffect(() => {
    onRefresh();
  }, []);

  /* const onRefresh = () => {
    dispatch(getDataAction({}, {myUIChange: () => setabcde(true)}));
  }; */

  const onRefresh = () => {
    dispatch(
      getDataAction({
        modalChange: () => {
          setModalVisible(true);
        },
      }),
    );
  };
  const signoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        return navigation.navigate('Login');
      });
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Your Data has been successfully Loaded !!!!!!
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={close}
                  style={{height: 40, width: 40, tintColor: 'red'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 40,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
