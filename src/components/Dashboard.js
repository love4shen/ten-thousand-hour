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
import NavBarRouteMapperRightButton from './NavBarRouteMapperRightButton';

const updateAddItemRoute = (navigator) => (newProp) => {
  navigator.replace(Object.assign({
    id: 'addItem',
    title: 'Add New Sth',
    text: '',
  }, newProp));
}

const NavigationBarRouteMapper = (props) => ({
  Title: NavBarRouteMapperTitle,
  LeftButton: NavBarRouteMapperLeftButton,
  RightButton: (r, n, i, ns) => NavBarRouteMapperRightButton(r, n, i, ns, props),
});

const Dashboard = (props) => (
  <Navigator
  initialRoute={{
    title: props.appInfo.appName,
    id: 'dashboard',
  }}
  renderScene={(route, nav) => {
    switch (route.id) {
      case 'dashboard':
      return (
        <ItemsList
        goals={props.goals}
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
        nav={nav}
        goal={props.goals.find(i => i.name === route.title)}
        onUpdateProgressClick={props.onUpdateProgressClick}
        onDeleteGoalClick={props.onDeleteGoalClick}
        onCloseBannerClick={props.onCloseBannerClick}
        setTimerHelp={props.setTimerHelp}
        clearTimerHelp={props.clearTimerHelp}
        goals={props.goals}
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
    routeMapper={NavigationBarRouteMapper(props)}
    style={styles.navBar}
    />
  }
  />
)

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
