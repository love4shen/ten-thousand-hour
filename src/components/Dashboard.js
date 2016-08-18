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
import Settings from './Settings';

const updateAddItemRoute = (navigator) => (newProp) => {
  navigator.replace(Object.assign({
    id: 'addItem',
    title: 'Add New Sth',
    text: '',
  }, newProp));
}

const NavigationBarRouteMapper = (onAddGoalClick) => ({
  Title: NavBarRouteMapperTitle,
  LeftButton: NavBarRouteMapperLeftButton,
  RightButton: (r, n, i, ns) => NavBarRouteMapperRightButton(r, n, i, ns, onAddGoalClick),
});

const Dashboard = ({
  goals,
  appInfo,
  settings,
  onAddGoalClick,
  ...rest
  }) => (
  <Navigator
  initialRoute={{
    title: appInfo.appName,
    id: 'dashboard',
  }}
  renderScene={(route, nav) => {
    switch (route.id) {
      case 'dashboard':
      return (
        <ItemsList
        goals={goals}
        nav={nav}
        targetHour={settings.targetHour}
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
        goal={goals[route.itemId]}
        targetHour={settings.targetHour}
        {...rest}
        />
      );
      case 'settings':
      return (
        <Settings
        settings={settings}
        appInfo={appInfo}
        />
      )
      default:
      return null;
    }
  }}

  configureScene={(route, routeStack) => {
    switch (route.id) {
      case 'addItem':
      case 'settings':
      return Navigator.SceneConfigs.FloatFromBottom;
      default:
      return Navigator.SceneConfigs.PushFromRight;
    }
  }}

  navigationBar={
    <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper(onAddGoalClick)}
    style={styles.navBar}
    />
  }
  />
)

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#f5f5f7',
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
