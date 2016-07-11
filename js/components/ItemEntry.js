/**
* @flow
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';

class ItemEntry extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(nav, title) {
    nav.push({
      id: 'itemDetail',
      title,
    })
  }

  render() {
    const {item, nav} = this.props;

    return (
      <TouchableHighlight
      onPress={this.onPress.bind(this, nav, item.name)}
      >
      <View style={styles.wrap}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.progress}>{item.progress}</Text>
      </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: '200',
  },
  progress: {
    flex: 0,
  }
});

export default ItemEntry;
