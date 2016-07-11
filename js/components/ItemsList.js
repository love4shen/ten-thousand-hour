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

class ItemsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.itemList);

    return (
      <View style={styles.scene}>
        <ListView
          dataSource={dataSource}
          renderRow={(item) => (
            <ItemEntry
              item={item}
              nav={this.props.nav}
              />
          )}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#efeff4',
  },
});

export default ItemsList;
