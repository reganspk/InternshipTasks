import MapView, {Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import location from '../images/location.png';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b8a66',
  },
  /* userType: {
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
  }, */
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Maps = () => {
  const [initialState, setInitialState] = useState({
    lat: '',
    long: '',
    description: '',
  });
  const [region, setRegion] = useState({
    lat: '',
    long: '',
  });
  console.log(initialState, 'mathi');
  const geoLocation = () => {
    Geolocation.getCurrentPosition(info =>
      setInitialState({
        ...initialState,
        lat: info.coords.latitude,
        long: info.coords.longitude,
      }),
    );
  };
  useEffect(() => {
    geoLocation();
  }, []);

  Geolocation.watchPosition((success, error) => {
    console.log(success, 'success');
    console.log(error, 'error');
  });
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setRegion({
            lat: details.geometry.location.lat,
            long: details.geometry.location.lng,
            description: data.description,
          });
          console.log(
            data.description,
            'lksjf',
            details.geometry.location.lat,
            initialState,
            'lkjfgljk',
          );
        }}
        styles={{
          container: {
            position: 'absolute',
            flex: 0,
            width: '100%',
            zIndex: 1,
            top: 0,
          },
          listView: {
            backgroundColor: '#fff',
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
            height: 50,

            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 10,
            fontSize: 20,
            flex: 1,
            zIndex: 1,
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
          types: 'establishment',
          radius: 30000,
          location: `${region.lat},${region.long}`,
        }}
        currentLocation={true}
        listViewDisplayed="auto"
        fetchDetails={true}
        currentLocationLabel="Current Location"
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: ['gym'],
        }}
        GooglePlacesDetailsQuery={{
          field: ['formatted_address', 'geometry'],
        }}
      />
      <Text>Hello</Text>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: initialState.lat,
          longitude: initialState.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={regions => console.log(regions, 'region')}>
        <Marker
          coordinate={{
            latitude: initialState.lat,
            longitude: initialState.long,
          }}
          size={10}
          title="marker"
          resizeMode="contain"
          description={initialState.description}
          resizeMode="contain"
          width={30}
          height={30}
          draggable={true}
          onDragStart={e => console.log(e)}
          onDragEnd={e =>
            setInitialState({
              lat: e.nativeEvent.coordinate.latitude,
              long: e.nativeEvent.coordinate.longitude,
            })
          }
        />
        {region.lat !== '' && (
          <Marker coordinate={{latitude: region.lat, longitude: region.long}} />
        )}
      </MapView>
    </View>
  );
};
