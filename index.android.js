/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
import TabView from './src/TabView.android.js';

const chronreact = React.createClass({

  _renderScene(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        {...route.passProps} />
    );
  },

  render() {
    return (
      <Navigator 
        initialRoute={{ title: "The Chronicle", component: TabView }}
        renderScene={this._renderScene}   
      />
    );
  }
});

AppRegistry.registerComponent('chronreact', () => chronreact);
