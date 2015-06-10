'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  TabBarIOS
} = React;

var Frontpage = require('./src/Frontpage');
var TabBar = require('./src/TabBar');

var chronreact = React.createClass({
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
            title="Frontpage"
            selected={true} >
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'News',
              component: Frontpage
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('chronreact', () => chronreact);
