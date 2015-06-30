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
var Sections = require('./src/Sections');
var TabBar = require('./src/TabBar');

var chronreact = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'Frontpage'
    };
  },
  tabIsSelected(name) {
    return this.state.selectedTab === name;
  },
  switchTabHandler(name) {
    return () => this.setState({selectedTab: name});
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
            title="Frontpage"
            selected={this.tabIsSelected('Frontpage')}
            onPress={this.switchTabHandler('Frontpage')} >
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'News',
              component: Frontpage
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            title="Sections"
            selected={this.tabIsSelected('Sections')}
            onPress={this.switchTabHandler('Sections')} >
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Sections',
              component: Sections
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
