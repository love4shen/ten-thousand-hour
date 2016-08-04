import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const NavBarRouteMapperRightButton = (route, navigator, index, navState, props) => {
  switch (route.id) {
    case 'dashboard':
    return (
      <TouchableOpacity
      onPress={() => navigator.push({
        id: 'addItem',
        title: 'Add New Sth',
        text: '',
      })}
      style={styles.button}>
      <Text style={styles.text}>
      Add
      </Text>
      </TouchableOpacity>
    );
    case 'addItem':
    return (
      <TouchableOpacity
      onPress={() => {
        props.onAddGoalClick(route.text);
        navigator.pop();
      }}
      style={styles.button}>
      <Text style={styles.text}>
      Done
      </Text>
      </TouchableOpacity>
    )
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
    paddingRight: 10,
  },
});

export default NavBarRouteMapperRightButton;
