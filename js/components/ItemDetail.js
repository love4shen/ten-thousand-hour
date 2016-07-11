/**
* @flow
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  SegmentedControlIOS,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

const ItemDetail = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    return {
      progress: this.props.item.progress,
      isTiming: false,
      manuallyTimeChangeAmount: '5 min',
    };
  },
  tick: function() {
    this.setState({progress: this.state.progress + 1});
  },
  format: function(num) {
    if (num < 10) return '0' + num;
    return num;
  },
  manullyChangeTime: function(action, val) {
    const timeMapping = {
      '5 min': 5*60,
      '10 min': 10*60,
      '15 min': 15*60,
      '30 min': 30*60,
      '1 hour': 60*60,
    }

    if (val in timeMapping) {
      let amount = timeMapping[val];
      if (action.includes('Subtract')) amount *= -1;

      this.setState({progress: this.state.progress + amount});
    }
  },
  render: function() {
    let left = this.state.progress;
    const hours = Math.floor(left/3600);
    left %= 3600;
    const minutes = Math.floor(left/60);
    left %= 60;
    const seconds = left;

    return (
      <View style={styles.scene}>
        <Text>{this.format(hours)}:{this.format(minutes)}:{this.format(seconds)}</Text>

        <TouchableHighlight
          onPress={() => {
            if (!this.state.isTiming) {
              this.interval = this.setInterval(this.tick, 1000);
            } else {
              this.clearInterval(this.interval);
            }

            this.setState({isTiming: !this.state.isTiming})
          }}
          underlayColor='#ffffff00'
          >
          {(() => {
            if (this.state.isTiming) {
              return (<Text>Stop</Text>);
            } else {
              return (<Text>Start</Text>)
            }})()}
          </TouchableHighlight>
          <SegmentedControlIOS
            values={['Add Time', 'Subtract Time']}
            momentary={true}
            onValueChange={(action) => {
              this.manullyChangeTime(action, this.state.manuallyTimeChangeAmount);
            }}
            />
          <SegmentedControlIOS
            values={['5 min', '10 min', '15 min', '30 min', '1 hour']}
            selectedIndex={0}
            onValueChange={(val) => {
              this.setState({manuallyTimeChangeAmount: val})
            }}
            />
      </View>
    )
  }
});

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#efeff4',
  },
})

export default ItemDetail;
