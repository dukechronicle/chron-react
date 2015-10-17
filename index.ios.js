const React = require('react-native');
const {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
} = React;

const Frontpage = require('./src/Frontpage');
const LinksListing = require('./src/LinksListing');
const Sections = require('./src/Sections');

const NavigationActionCreators = require('./src/actions/NavigationActionCreators');

const store = require('./src/store');
const tabCursor = store.select('views', 'tab');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const chronreact = React.createClass({
  getInitialState() {
    return {
      selectedTab: tabCursor.get(),
    };
  },

  componentDidMount() {
    tabCursor.on('change', this.updateTab);
  },

  componentWillUnmount() {
    tabCursor.off('change', this.updateTab);
  },

  updateTab() {
    this.setState({
      selectedTab: tabCursor.get(),
    });
  },

  tabIsSelected(name) {
    return this.state.selectedTab === name;
  },

  switchTabHandler(name) {
    return () => {
      NavigationActionCreators.selectSection(name);
      this.setState({selectedTab: name});
    };
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
              title: 'Frontpage',
              component: Frontpage,
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
              component: Sections,
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            title="Links"
            selected={this.tabIsSelected('links')}
            onPress={this.switchTabHandler('links')} >
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Links',
              component: LinksListing,
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

AppRegistry.registerComponent('chronreact', () => chronreact);
