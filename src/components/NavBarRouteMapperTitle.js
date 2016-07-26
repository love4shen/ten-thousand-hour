import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const NavBarRouteMapperTitle = (route, navigator, index, navState) => (
  <Text style={styles.text}>
  {route.title}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginVertical: 10,
    color: '#373e4d',
    fontWeight: '500',
    marginVertical: 9,
  },
});

export default NavBarRouteMapperTitle;
