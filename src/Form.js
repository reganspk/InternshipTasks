import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const Form = ({data, keyboard}) => {
  return (
    <View style={styles.field}>
      <Text style={{flex: 0.2}}>{data}:</Text>
      {keyboard ? (
        <TextInput
          placeholder={data}
          style={styles.fieldInput}
          keyboardType={keyboard}
        />
      ) : (
        <TextInput placeholder={data} style={styles.fieldInput} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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

export default Form;
