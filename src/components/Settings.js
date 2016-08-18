import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
} from 'react-native';

import TableView from 'react-native-tableview';

const camalCaseFormat = (text) => {
  const matched = text.match(/([a-z]+)([A-Z][a-z]*)*/);
  return matched[1][0].toUpperCase() + matched[1].substring(1) + (matched[2] === undefined ? '' : ` ${matched[2]}`);
}

const Settings = ({ settings, appInfo }) => (
  <TableView style={styles.scene}
  allowsToggle={true}
  allowsMultipleSelection={true}
  tableViewStyle={TableView.Consts.Style.Plain}
  tableViewCellStyle={TableView.Consts.CellStyle.Value1}
  >
  <TableView.Section label='About' style={styles.section}>
  {Object.keys(appInfo).map(k => (
    <TableView.Item detail={appInfo[k]} key={`settingCredits${k}`}>{camalCaseFormat(k)}</TableView.Item>
  ))}
  </TableView.Section>
  </TableView>
);


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#f9f9f9',
  },
  section: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e0e0e0',
  }
});

export default Settings;
