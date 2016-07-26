import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const NavBarRouteMapperLeftButton = (route, navigator, index, navState) => {
  switch (route.id) {
    case 'addItem':
    return (
      <TouchableOpacity
      onPress={() => navigator.pop()}
      style={styles.button}>
      <Text style={styles.text}>
      Cancel
      </Text>
      </TouchableOpacity>
    );
    case 'itemDetail':
    return (
      <TouchableOpacity
      onPress={() => {
        navigator.pop();
      }}
      style={styles.button}>
      <Text style={styles.text}>
      Back
      </Text>
      </TouchableOpacity>
    );
    default:
    return null;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    paddingLeft: 10,
  },
});

export default NavBarRouteMapperLeftButton;
