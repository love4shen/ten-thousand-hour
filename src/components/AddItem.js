import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio,
} from 'react-native';

import TextField from 'react-native-md-textinput';

const AddItem = ({ text, updateAddItemRoute }) => (
  <View style={styles.scene}>
  <View style={styles.wrapper}>
  <TextInput
  style={[styles.label, styles.inputGroupMember]}
  value={'Name'}
  editable = {false}
  />
  <TextInput
  style={[styles.input, styles.inputGroupMember]}
  onChangeText={(text) => updateAddItemRoute({text})}
  value={text}
  autoFocus={true}
  placeholder={'Enter Task Name'}
  returnKeyType={'done'}
  editable = {true}
  maxLength = {40}
  />
  </View>
  </View>
)

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64,
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#f9f9f9',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputGroupMember: {
    height: 40,
    backgroundColor: '#fff',
  },
  label: {
    flex: 1,
    paddingLeft: 10,
  },
  input: {
    flex: 3,
  },
});


export default AddItem;
