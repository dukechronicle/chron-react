'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  View,
  Text
} = React;

var TabBar = React.createClass({
  item(pageText) {
    return (
      <View style={[styles.tabContent, {backgroundColor: "#fff"}]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  },
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Frontpage">
          {this.item('Frontpage')}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabBar
