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

var NavigationActionCreators = require('./src/actions/NavigationActionCreators');
var NavigationStore = require('./src/stores/NavigationStore');

var chronreact = React.createClass({
  getInitialState() {
    return {
      selectedTab: NavigationStore.getTab()
    };
  },

  componentDidMount() {
    NavigationStore.addChangeListener(this.updateTab);
  },

  componentDidUnmount() {
    NavigationStore.removeListener(this.updateTab);
  },

  updateTab() {
    this.setState({
      selectedTab: NavigationStore.getTab()
    });
  },

  tabIsSelected(name) {
    return this.state.selectedTab === name;
  },

  switchTabHandler(name) {
    return () => {
      NavigationActionCreators.selectSection(name);
      this.setState({selectedTab: name});
    }
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
            title="Frontpage"
            selected={this.tabIsSelected('frontpage')}
            onPress={this.switchTabHandler('frontpage')} >
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
            selected={this.tabIsSelected('sections')}
            onPress={this.switchTabHandler('sections')} >
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
