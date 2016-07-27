import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import AddItem from './AddItem';
import ItemsList from './ItemsList';
import ItemDetail from './ItemDetail';
import NavBarRouteMapperTitle from './NavBarRouteMapperTitle';
import NavBarRouteMapperLeftButton from './NavBarRouteMapperLeftButton';
// import NavBarRouteMapperRightButton from './NavBarRouteMapperRightButton';

const updateAddItemRoute = (navigator) => (newProp) => {
  navigator.replace(Object.assign({
    id: 'addItem',
    title: 'Add New Sth',
    text: '',
  }, newProp));
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.NavigationBarRouteMapper = {
      Title: NavBarRouteMapperTitle,
      LeftButton: NavBarRouteMapperLeftButton,
      RightButton: (route, navigator, index, navState) => {
        switch (route.id) {
          case 'dashboard':
          return (
            <TouchableOpacity
            onPress={() => navigator.push({
              id: 'addItem',
              title: 'Add New Sth',
              text: '',
            })}
            style={styles.button}>
            <Text style={styles.text}>
            Add
            </Text>
            </TouchableOpacity>
          );
          case 'addItem':
          return (
            <TouchableOpacity
            onPress={() => {
              this.props.onAddGoalClick(route.text);
              navigator.pop();
            }}
            style={styles.button}>
            <Text style={styles.text}>
            Done
            </Text>
            </TouchableOpacity>
          )
          default:
          return null;
        }
      }
    }
  }

  render() {
    return (
      <Navigator
      initialRoute={{
        title: 'AppNameGoesHere',
        id: 'dashboard'
      }}
      renderScene={(route, nav) => {
        switch (route.id) {
          case 'dashboard':
          return (
            <ItemsList
            goals={this.props.goals}
            nav={nav}
            />
          );
          case 'addItem':
          return (
            <AddItem
            ref={c => this.AddItem = c}
            text={route.text}
            updateAddItemRoute={updateAddItemRoute(nav)}
            />
          );
          case 'itemDetail':
          return (
            <ItemDetail
            ref={c => this.ItemDetail = c}
            goal={this.props.goals.find(i => i.name === route.title)}
            onUpdateProgressClick={this.props.onUpdateProgressClick}
            setTimerHelp={this.props.setTimerHelp}
            clearTimerHelp={this.props.clearTimerHelp}
            goals={this.props.goals}
            />
          )
          default:
          return null;
        }
      }}

      configureScene={(route, routeStack) => {
        switch (route.id) {
          case 'addItem':
          return Navigator.SceneConfigs.FloatFromBottom;
          default:
          return Navigator.SceneConfigs.PushFromRight;
        }
      }}

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
  navBar: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#cdcdcd',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    paddingRight: 10,
  },
});

export default Dashboard;
