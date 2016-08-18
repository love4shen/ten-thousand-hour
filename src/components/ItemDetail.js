import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  SegmentedControlIOS,
  PixelRatio,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

const format = (num) => (num < 10) ? '0' + num : num;

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeCtrlValue: '5 min',
      shouldShowBanner: true,
    }
  }

  manullyChangeTime(id, progress, action, val) {
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

      this.props.onUpdateProgressClick(id, progress + amount);
    }
  }

  autoChangeTime(id) {
    this.props.onUpdateProgressClick(id, this.props.goal.progress + 1);
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
      <View style={styles.wrapper}>

      {(goal.progress >= 36000 && goal.shouldShowBanner) ?
        (<View style={styles.banner}>
          <Text style={styles.congrats}>CONGRAGULATIONS!</Text>
          <Text style={styles.congrats}>You've spent over 10,000 hours on this goal!</Text>
          <View style={styles.bannerCloseBtn}>
            <TouchableHighlight
              onPress={() => this.props.onCloseBannerClick(goal.id)}
              underlayColor='#ffffff00'
            >
              <Text>⨉</Text>
            </TouchableHighlight>
          </View>
        </View>) :
        null}
      <Text style={styles.progress}>{format(hours)}:{format(minutes)}:{format(seconds)}</Text>

      <View style={[styles.btn, styles.timing]}>
      <TouchableHighlight
      onPress={() => {
        if (!goal.interval) {
          setTimerHelp(goal.id, TimerMixin.setInterval(() => {
            this.autoChangeTime(goal.id);
          }, 1000));
        } else {
          clearTimerHelp(goal.id);
        }
      }}
      underlayColor='#ffffff00'
      >
      <Text style={styles.btnText}>{goal.interval ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
      </View>
      <SegmentedControlIOS
      style={[styles.segctrl, styles.segctrolTop]}
      values={['Add Time', 'Subtract Time']}
      momentary={true}
      onValueChange={(action) => {
        this.manullyChangeTime(goal.id, goal.progress, action, this.state.timeCtrlValue);
      }}
      />
      <SegmentedControlIOS
      style={[styles.segctrl, styles.segctrolBottom]}
      values={['5 min', '10 min', '15 min', '30 min', '1 hour']}
      selectedIndex={0}
      onValueChange={(val) => {
        this.setState({timeCtrlValue: val})
      }}
      />
      <View style={[styles.btn, styles.delete]}>
      <TouchableOpacity
        onPress={() => {
          this.props.onDeleteGoalClick(goal.id);
          this.props.nav.pop();
        }}
      >
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
      </View>
      </View>
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
  wrapper: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
  },
  congrats : {
    color: 'red',
    alignSelf: 'center',
  },
  progress: {
    fontSize: 36,
    fontWeight: '200',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  segctrl: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  segctrolTop: {
    marginTop: 10,
    marginBottom: 5,
  },
  segctrolBottom: {
    marginTop: 5,
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  btn: {
    borderWidth: 1 / PixelRatio.get(),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  delete: {
    backgroundColor: '#d9534f',
    borderColor: '#d43f3a',
  },
  timing: {
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4',
  },
  banner: {
    alignSelf: 'stretch',
  },
  bannerCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
})

export default ItemDetail;
