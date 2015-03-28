'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View
} = React;

var Frontpage = require('./Frontpage');

var API_URL = 'https://api.dukechronicle.com/qduke';
var chronreact = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'News',
          component: Frontpage
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('chronreact', () => chronreact);
