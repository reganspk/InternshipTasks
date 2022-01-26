import React, {useState} from 'react';
import image from './images/react.png';
import search from './images/122932.png';
import calender from './images/download.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppWrapper = ({navigation, route}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  console.log(route.params);
  const selector = useSelector(state => state.sampleReducer);
  if (selector.success) {
    console.log(selector, 'from appWrapper');
  }
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectGender, setSelectGender] = useState('Male');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const [text, setText] = useState('');
  const onchange = (event, selectedDate) => {
    if (event.type === 'set') {
      setShow(false);
      setDate(selectedDate);
      setText(new Date(selectedDate).toLocaleDateString());
    } else if (event.type === 'dismissed') {
      setShow(false);
      setDate(new Date());
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    number: '',
    address: '',
    email: '',
  });

  const submitHandle = () => {
    dispatch({
      type: 'SUCCESS',
      payload: formData,
      selectGender,
      date,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Register</Text>
        {/*  {data.map((data, i) => {
            return (
              <Form
                key={i}
                title={`${data[0].toUpperCase() + data.slice(1)}`}
                sajin={data}
              />
            );
          })} */}
        <View style={styles.field}>
          <Text style={{flex: 0.2}}>First Name:</Text>

          <TextInput
            style={styles.fieldInput}
            placeholder="First Name"
            onChangeText={text =>
              setFormData({
                ...formData,
                firstName: text,
              })
            }
          />
        </View>
        <View style={styles.field}>
          <Text style={{flex: 0.2}}>Middle Name:</Text>

          <TextInput
            placeholder="Middle Name"
            style={styles.fieldInput}
            onChangeText={text => {
              setFormData({
                ...formData,
                middleName: text,
              });
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={{flex: 0.2}}>Last Name:</Text>

          <TextInput
            placeholder="Last Name"
            style={styles.fieldInput}
            onChangeText={text => {
              setFormData({
                ...formData,
                lastName: text,
              });
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={{flex: 0.2}}>Number:</Text>

          <TextInput
            keyboardType="number-pad"
            placeholder="Phone Number"
            style={styles.fieldInput}
            onChangeText={text => {
              setFormData({
                ...formData,
                number: text,
              });
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={{flex: 0.2}}>Email:</Text>

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.fieldInput}
            onChangeText={text => {
              setFormData({
                ...formData,
                email: text,
              });
            }}
          />
        </View>

        <View style={styles.field}>
          <Text style={{flex: 0.5}}>Date Of Birth:</Text>
          <View style={{flexDirection: 'row', paddingHorizontal: 6}}>
            <Text
              style={{
                borderWidth: 1,
                flex: 0.5,
                height: 30,
                borderRadius: 5,
              }}>
              {text}
            </Text>
            <TouchableOpacity onPress={() => setShow(true)}>
              <Image
                source={calender}
                style={{height: 20, width: 20, marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="spinner"
              onChange={onchange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <Menu style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.3}}>Gender:</Text>
          <Text style={{}}>{selectGender}</Text>
          <MenuTrigger
            text="+"
            style={{paddingHorizontal: 10, fontWeight: 'bold'}}
          />
          <MenuOptions>
            <MenuOption text="Male" onSelect={() => setSelectGender('Male')} />
            <MenuOption
              text="Female"
              onSelect={() => setSelectGender('Female')}
            />
          </MenuOptions>
        </Menu>
        <Switch
          trackColor={{false: '#fff', true: 'pink'}}
          thumbColor={isEnabled ? '#f5dd4b' : 'blue'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity
          onPress={submitHandle}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            margin: 20,
            backgroundColor: 'black',
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff'}}>Submit</Text>
        </TouchableOpacity>
      </View>

      {selector.success && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderWidth: 2,
              borderColor: 'black',
            }}>
            <Text style={{paddingHorizontal: 3}}>
              Full Number: {selector.data.firstName}
            </Text>
            <Text style={{paddingHorizontal: 3}}>
              {selector.data.middleName}
            </Text>
            <Text style={{paddingHorizontal: 3}}>{selector.data.lastName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderWidth: 2,
              borderColor: 'black',
            }}>
            <Text style={{paddingHorizontal: 3}}>
              Phone Number: {selector.data.number}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderWidth: 2,
              borderColor: 'black',
            }}>
            <Text style={{paddingHorizontal: 3}}>
              Email: {selector.data.email}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',

    backgroundColor: '#cbcbcb',
    marginVertical: 20,
    marginHorizontal: wp(5),
    borderWidth: 2,
    borderHeight: 2,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  },
  img: {
    height: 50,
    width: 50,
  },
  field: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  fieldInput: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    width: '60%',
    height: '80%',
    borderRadius: 10,
    flex: 0.6,
  },
  text: {
    fontSize: 42,
  },

  field: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  fieldInput: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    width: '60%',
    height: '80%',
    borderRadius: 10,
    flex: 0.6,
  },
});

export default AppWrapper;
