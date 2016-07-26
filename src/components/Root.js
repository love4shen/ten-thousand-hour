/**
* @flow
*/

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DashboardWrapper from '../containers/DashboardWrapper';
import configureStore from '../configureStore';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <DashboardWrapper />
      </Provider>
    );
  }
}

export default Root;
