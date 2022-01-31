import {View, Button, Text} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';
import React, {useEffect} from 'react';
const AppPermissions = () => {
  const requestPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(response => {
      console.log(response);
    });
  };
  const requestLocation = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(response => {
      console.log(response, 'locaton');
    });
  };
  useEffect(() => {
    //requestLocation();
  }, []);
  const checkMultiplePermissions = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
      console.log('FaceID', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
    });
  };
  const requstMultiplePermissions = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CALL_PHONE,
    ]).then(response => {
      console.log(response, 'Multiple');
    });
  };
  useEffect(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CALL_PHONE,
    ]).then(response => {
      console.log(response, 'multiple');
    });
  }, []);
  const checkPermissions = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  };
  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            requestPermission();
          }}
          title="request"
        />
        <Button title="request" onPress={checkPermissions} />
        <Button title="requestLocation" onPress={requestLocation} />
        <Button title="requestLocation" onPress={requstMultiplePermissions} />
        <Button
          title="requestLocation"
          onPress={() => {
            openSettings().catch(() => console.log('Cannot'));
          }}
        />
      </View>
    </>
  );
};

export default AppPermissions;
