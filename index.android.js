/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import store from './src/store';
import Frontpage from './src/Frontpage';
import SectionPostListing from './src/SectionPostListing';
import SectionActionCreators from './src/actions/SectionActionCreators';

// Get the sections
const sectionsCursor = store.select('models', 'topLevelSections');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    
  },
  headerText: {
    fontFamily: 'Didot',
    fontSize: 30, 
    padding: 10,
    paddingLeft: 20,
    paddingBottom: 0,
    color: '#fff',
    backgroundColor: '#083e8c',
  },
  tabbar: {
    backgroundColor: '#083e8c',
    elevation: 0,
  },
  appBar: {
    elevation: 4, 
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
  },
  tab: {
    // backgroundColor: '#fff',
    width: 120,
  },
  indicator: {
    backgroundColor: '#fff',
  },
  tabLabel: {
    color: '#fff',
  },
});

const chronreact = React.createClass({
  getInitialState() { 
    return {
      index: 0,
      routes: null,
    };
  },

  componentDidMount: function() {
    if (sectionsCursor.get().length === 0) {
      SectionActionCreators.getSections();
    } else {
      this._updateState();
    }
    sectionsCursor.on('update', this._updateState);
  },

  componentWillUnmount: function() {
    sectionsCursor.off('update', this._updateState);
  },

  _updateState() {
    routes = [{key: '1', title: 'Frontpage'}];
    sectionsCursor.get().forEach((section, index) => {
      routes.push({ 
        key: section.name, 
        title: section.name,
        /* data that is passed into the SectionPostListing */
        section,
      });
    })
    this.setState({ routes });
  },

  _handleChangeTab(index) {
    this.setState({ index });
  },

  _renderHeader(props) {
    return (
      <View style={styles.appBar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>The Chronicle</Text>
        </View>
        <TabBar 
          {...props} 
          style={styles.tabbar}
          scrollEnabled={true}
          indicatorStyle={styles.indicator}
          tabStyle={styles.tab} 
          labelStyle={styles.tabLabel}
        />
      </View>
    );
  },

  _renderScene({ route }) {
    switch (route.key) {
    case '1':
      return <Frontpage navigator={{}}/>
    default:
      return <SectionPostListing section={route.section} navigator={{}}/>
    }
  },

  render() {
    return this.state.routes == null ? 
      <View /> : (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  },

});

AppRegistry.registerComponent('chronreact', () => chronreact);
