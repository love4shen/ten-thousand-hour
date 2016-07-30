import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';

// import Swipeout  from 'react-native-swipeout';

const formatProgressToHour = (num) => {
  const hours = Math.ceil(num/3600);
  const rem = num%3600;

  return rem < 1800 ? '' + hours : '~' + hours;
}

const onGoalPress = (nav, title) => {
  nav.push({
    id: 'itemDetail',
    title,
  });
};

const swipeBtns = [{
  text: 'Delete',
  backgroundColor: 'red',
  onPress: () => {}
}];

const ItemEntry = ({item, nav}) => (
  // <Swipeout right={swipeBtns}
  // autoClose='true'
  // backgroundColor= 'transparent'>
  <TouchableHighlight
  onPress={() => onGoalPress(nav, item.name)}
  >
  <View style={styles.wrap}>
  <View style={styles.container}>
  <Text style={styles.name}>{item.name}</Text>
  {(item.progress >= 36000) ? (
    <Text style={[styles.successText]}>🌟</Text>
  ) : null}
  </View>
  <Text style={styles.progress}>{formatProgressToHour(item.progress)}</Text>
  </View>
  </TouchableHighlight>
  // </Swipeout>
)

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '200',
  },
  successLabel: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  successText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'red',
    fontWeight: '700',
    marginHorizontal: 6
  },
  progress: {
    flex: 0,
  }
});

export default ItemEntry;
