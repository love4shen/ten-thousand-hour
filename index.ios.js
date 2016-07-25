/**
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

import AddItem from './js/components/AddItem';
import ItemsList from './js/components/ItemsList';
import ItemDetail from './js/components/ItemDetail';

class tenThousandHour extends Component {
  constructor(props) {
    super(props);

    this.NavigationBarRouteMapper = {
      Title: (route, navigator, index, navState) => {
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
          </Text>
        );
      },
      LeftButton: (route, navigator, index, navState) => {
        switch (route.id) {
          case 'addItem':
          return (
            <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Cancel
            </Text>
            </TouchableOpacity>
          );
          case 'itemDetail':
          return (
            <TouchableOpacity
            onPress={() => {
              // this.updateProgress(route.title, this.ItemDetail.state.progress);
              navigator.pop();
            }}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Back
            </Text>
            </TouchableOpacity>
          );
          default:
          return null;
        }
      },

      RightButton: (route, navigator, index, navState) => {
        switch (route.id) {
          case 'dashboard':
          return (
            <TouchableOpacity
            onPress={() => navigator.push({
              id: 'addItem',
              title: 'Add New Sth',
            })}
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Add
            </Text>
            </TouchableOpacity>
          );
          case 'addItem':
          return (
            <TouchableOpacity
            onPress={() => {
              this.addItem(this.AddItem.state.text);
              navigator.pop();
            }}
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Done
            </Text>
            </TouchableOpacity>
          )
          default:
          return null;
        }
      },
    }

    this.state = {
      itemList: [{
        name: 'Sample 1',
        progress: 3599,
        interval: null,
        isTiming: false,
      },],
    }

    this.addItem = this.addItem.bind(this);

    this.updateItemState = this.updateItemState.bind(this);
    this.clearIntervalHelp = this.clearIntervalHelp.bind(this);
  }

  componentWillUnmount() {
    this.state.itemList.forEach(item => {
      clearIntervalHelp(item);
    });
  }

  addItem(name) {
    const {itemList} = this.state;

    if (name !== '' && !Object.keys(itemList).map(e => itemList[e].name).includes(name)) {
      this.setState({itemList: itemList.concat([{
        name,
        progress: 0,
      }])});
    }
  }

  updateItemState(name, keyVals) {
    const {itemList} = this.state;
    const targetIndex = itemList.findIndex(e => e.name === name);

    const newItemList = itemList.slice(0, targetIndex).concat([Object.assign({}, itemList[targetIndex], keyVals)]).concat(itemList.slice(targetIndex + 1));
    // console.log(newItemList, keyVals);
    this.setState({itemList: newItemList});
  }

  clearIntervalHelp(item) {
    TimerMixin.clearInterval(item.interval);
    this.updateItemState(item.name, {interval: null});
  }

  render() {
    return (
      <Navigator
      ref={(nav) => this.navRef = nav}
      initialRoute={{
        title: 'AppNameGoesHere',
        id: 'dashboard'
      }}
      renderScene={(route, nav) => {
        switch (route.id) {
          case 'dashboard':
          return (
            <ItemsList
            ref={c => this.ItemsList = c}
            itemList={this.state.itemList}
            nav={nav}
            />
          );
          case 'addItem':
          return (
            <AddItem
            ref={c => this.AddItem = c}
            />
          );
          case 'itemDetail':
          return (
            <ItemDetail
            ref={c => this.ItemDetail = c}
            item={this.state.itemList.find(i => i.name === route.title)}
            updateItemState={this.updateItemState}
            clearIntervalHelp={this.clearIntervalHelp}
            TimerMixin={TimerMixin}
            />
          )
          default:
          return null;
        }
      }
    }

    configureScene={(route, routeStack) => {
      switch (route.id) {
        case 'addItem':
        return Navigator.SceneConfigs.FloatFromBottom;
        default:
        return Navigator.SceneConfigs.PushFromRight;
      }
    }
  }
  navigationBar={
    <Navigator.NavigationBar
    routeMapper={this.NavigationBarRouteMapper}
    style={styles.navBar}
    />
  }
  />
);
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#333',
    margin: 50,
  },
  navBar: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#cdcdcd',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373e4d',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 64,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
});

AppRegistry.registerComponent('tenThousandHour', () => tenThousandHour);
