import React from 'react';
import {
  StyleSheet,
  TabBarIOS,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

const TabBar = React.createClass({
  item: function(pageText) {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#fff'}]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Frontpage">
          {this.item('Frontpage')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

module.exports = TabBar;
