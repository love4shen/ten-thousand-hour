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
      <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      {(item.progress >= 36000) ? (
        <Text style={[styles.successText]}>🌟</Text>
      ) : null}
      </View>
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
