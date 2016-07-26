import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  SegmentedControlIOS,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

const format = (num) => (num < 10) ? '0' + num : num;

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeCtrlValue: '5 min',
    }
  }

  manullyChangeTime(action, val) {
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

      this.props.onUpdateProgressClick(this.props.goal.id, this.props.goal.progress + amount);
    }
  }

  render() {
    let left = this.props.goal.progress;
    const hours = Math.floor(left/3600);
    left %= 3600;
    const minutes = Math.floor(left/60);
    left %= 60;
    const seconds = left;

    const { goal, setTimerHelp, clearTimerHelp, onUpdateProgressClick, goals } = this.props;

    return (
      <View style={styles.scene}>
      {(goal.progress >= 36000) ? <Text>CONGRATS!</Text> : null}
      <Text>{format(hours)}:{format(minutes)}:{format(seconds)}</Text>

      <TouchableHighlight
      onPress={() => {
        if (!goal.interval) {
          setTimerHelp(goal.id, TimerMixin.setInterval(() => {
            onUpdateProgressClick(goal.id, goals.find(g => g.id === goal.id).progress + 1);
          }, 1000));
        } else {
          clearTimerHelp(goal.id);
        }
      }}
      underlayColor='#ffffff00'
      >
      {(() => {
        if (goal.interval) {
          return (<Text>Stop</Text>);
        } else {
          return (<Text>Start</Text>)
        }})()}
      </TouchableHighlight>
      <SegmentedControlIOS
      values={['Add Time', 'Subtract Time']}
      momentary={true}
      onValueChange={(action) => {
        this.manullyChangeTime(action, this.state.timeCtrlValue);
      }}
      />
      <SegmentedControlIOS
      values={['5 min', '10 min', '15 min', '30 min', '1 hour']}
      selectedIndex={0}
      onValueChange={(val) => {
        this.setState({timeCtrlValue: val})
      }}
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
})

export default ItemDetail;
