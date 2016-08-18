/**
* @flow
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
} from 'react-native';
import ItemEntry from './ItemEntry';

const ItemsList = ({ goals, ...rest }) => {
  const dataSource = new ListView
  .DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  .cloneWithRows(goals);

  return (
    <View style={styles.scene}>
    <ListView
    dataSource={dataSource}
    enableEmptySections={true}
    renderRow={item => (
      <ItemEntry
      item={item}
      {...rest}
      />
    )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#efeff4',
  },
});

export default ItemsList;
