var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  View,
  Text
} = React;

var TabBar = React.createClass({
  item: function(pageText) {
    return (
      <View style={[styles.tabContent, {backgroundColor: "#fff"}]}>
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
