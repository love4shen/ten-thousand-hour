import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio,
} from 'react-native';

const AddItem = ({ text, updateAddItemRoute }) => (
  <View style={styles.scene}>
  <Text style={styles.inputLabel}>
  Name
  </Text>
  <TextInput
  style={styles.inputBox}
  onChangeText={(text) => updateAddItemRoute({text})}
  value={text}
  autoFocus={true}
  placeholder={'Enter Task Name'}
  returnKeyType={'done'}
  />
  </View>
)

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64,
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#F5FCFF',
  },
  inputLabel: {
    color: '#373e4d',
    fontWeight: '500',
  },
  inputBox: {
    height: 40,
  },
});


export default AddItem;
