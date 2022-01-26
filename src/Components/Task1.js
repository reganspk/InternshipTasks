import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Modalize} from 'react-native-modalize';

const {width, height} = Dimensions.get('screen');
export default function Task1() {
  const modalizeRef = useRef(null);

  const [imageUri, setImageUri] = useState('');
  const [bool, setBool] = useState(false);
  let brand = DeviceInfo.getBrand();
  console.log(brand, 'brand ko name vandim tah hai ');
  DeviceInfo.getBaseOs().then(baseos => {
    console.log(baseos, 'baseos');
  });
  if (bool) {
    showMessage({
      message: brand,
      type: 'info',
    });
    setBool(false);
  }
  const openCamera = () => {
    console.log('hello');
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, res => {
      console.log('response = ', res);
      if (res.didCancel) {
        console.log('User has cancelled');
      } else if (res.error) {
        console.log('Image Picker Error');
      } else if (res.customButton) {
        console.log('User tapped custom Button');
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + res.assets[0].base64};
        setImageUri(source);
        console.log(imageUri);
      }
    });
  };

  const chooseFromGallery = () => {
    console.log('hello');
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      console.log('response = ', res);
      if (res.didCancel) {
        console.log('User has cancelled');
      } else if (res.error) {
        console.log('Image Picker Error');
      } else if (res.customButton) {
        console.log('User tapped custom Button');
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + res.assets[0].base64};
        setImageUri(source);
        console.log(imageUri);
      }
    });
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', paddingVertical: 50}}>
        <Text>Hello form task 1s</Text>
        <TouchableOpacity
          style={{backgroundColor: 'maroon', width: 70}}
          onPress={openCamera}>
          <Text style={{color: '#fff'}}>Click me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'maroon', width: 70}}
          onPress={chooseFromGallery}>
          <Text style={{color: '#fff'}}>Choose from gallery</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={imageUri}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'black',
          }}
        />
      </View>
      {/*   <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>...your content</Modalize>
      <FlashMessage position="top" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
