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

const ItemDetail = React.createClass({
  getInitialState: function() {
    return {
      manuallyTimeChangeAmount: '5 min',
    };
  },
  tick: function() {
    this.props.updateItemState(this.props.item.name, {progress: this.props.item.progress + 1});
    //this.setState({progress: this.state.progress + 1});
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

      this.props.updateItemState(this.props.item.name, {progress: this.props.item.progress + amount});

      //this.setState({progress: this.state.progress + amount});
    }
  },
  render: function() {
    let left = this.props.item.progress;
    const hours = Math.floor(left/3600);
    left %= 3600;
    const minutes = Math.floor(left/60);
    left %= 60;
    const seconds = left;

    return (
      <View style={styles.scene}>
      {(this.props.item.progress >= 36000) ? <Text>CONGRATS!</Text> : null}
      <Text>{this.format(hours)}:{this.format(minutes)}:{this.format(seconds)}</Text>

      <TouchableHighlight
      onPress={() => {
        const {TimerMixin} = this.props;
        const nextIntervalAndIsTiming = {};
        if (!this.props.item.isTiming) {
          nextIntervalAndIsTiming.interval = TimerMixin.setInterval(this.tick, 1000);
        } else {
          TimerMixin.clearInterval(this.props.item.interval);
          nextIntervalAndIsTiming.interval = null;
        }

        nextIntervalAndIsTiming.isTiming = !this.props.item.isTiming;

        this.props.updateItemState(this.props.item.name, nextIntervalAndIsTiming);
      }}
      underlayColor='#ffffff00'
      >
      {(() => {
        if (this.props.item.isTiming) {
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
