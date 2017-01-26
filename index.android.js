/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
} from 'react-native';
import TabView from './src/TabView.android';
import { NavigationBarRouteMapper } from './src/NavigationBarRouteMapper.android';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#083e8c',
    flex: 1,
    flexDirection: 'row',
  },
})

const chronreact = React.createClass({

  _renderScene(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        {...route.passProps} />
    );
  },

  _renderNavigationBar: function() {
    return (
      <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}
        style={styles.navBar}
      />
    );
  },

  render() {
    return (
      <Navigator 
        ref="navigator"
        initialRoute={{ 
          title: "The Chronicle", 
          component: TabView,
          titleStyleOverride: {
            fontFamily: 'Didot',
            fontSize: 25,
          },
        }}
        renderScene={this._renderScene}   
        navigationBar={this._renderNavigationBar()}
      />
    );
  }
});

AppRegistry.registerComponent('chronreact', () => chronreact);
