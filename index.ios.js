const React = require('react-native');
const {
  AppRegistry,
  LinkingIOS,
  Navigator,
  StyleSheet,
  StatusBarIOS,
  TabBarIOS,
} = React;

const _ = require('underscore');

const Frontpage = require('./src/Frontpage');
const LinksListing = require('./src/LinksListing');
const PostDetail = require('./src/components/PostDetail');
const PostDetailLoader = require('./src/PostDetailLoader');
const Sections = require('./src/Sections');

const NavigationActionCreators = require('./src/actions/NavigationActionCreators');
const PostActionCreators = require('./src/actions/PostActionCreators');

const { NavigationBarRouteMapper } = require('./src/NavigationBarRouteMapper.ios');

const store = require('./src/store');
const tabCursor = store.select('views', 'tab');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  navigator: {
    height: 64,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  innerComponent: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#083e8c',
    flex: 1,
    flexDirection: 'row',
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
    StatusBarIOS.setStyle('light-content');

    const url = LinkingIOS.popInitialURL();
    if (!_.isNull(url)) {
      const slug = url.replace(/dukechronicle:\/\//, '');
      PostActionCreators.getPost(slug);
      this.refs.frontpageNav.push({
        type: 'PostDetailLoader',
        passProps: {
          slug: slug,
        },
      });
    }
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

  renderScene: function(route, navigator) {
    switch (route.type) {
    case 'PostDetail':
      return (
        <PostDetail style={styles.innerComponent} {...route.passProps} />
      );
    case 'PostDetailLoader':
      return (
        <PostDetailLoader style={styles.innerComponent} {...route.passProps} />
      );
    case 'Frontpage':
      return (
        <Frontpage style={styles.innerComponent} navigator={navigator} />
      );
    case 'Sections':
      return (
        <Sections navigator={navigator} />
      );
    case 'LinksListing':
      return (
        <LinksListing navigator={navigator} />
      );
    default:
      return (
        <Frontpage style={styles.innerComponent} navigator={navigator} />
      );
    }
  },

  render: function() {
    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}
        style={styles.navBar}
      />
    );
    return (
      <TabBarIOS>
        <TabBarIOS.Item
            title="Frontpage"
            selected={this.tabIsSelected('frontpage')}
            icon={{uri: 'newspaper'}}
            onPress={this.switchTabHandler('frontpage')} >
          <Navigator
            ref="frontpageNav"
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            initialRoute={{
              title: 'Frontpage',
              type: 'Frontpage',
            }}
            navigationBar={navigationBar}
            renderScene={this.renderScene} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            title="Sections"
            selected={this.tabIsSelected('sections')}
            icon={{uri: 'sections'}}
            onPress={this.switchTabHandler('sections')} >
          <Navigator
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            navigationBar={navigationBar}
            renderScene={this.renderScene}
            initialRoute={{
              title: 'Sections',
              type: 'Sections',
            }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            title="Links"
            selected={this.tabIsSelected('links')}
            icon={{uri: 'link'}}
            onPress={this.switchTabHandler('links')} >
          <Navigator
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            navigationBar={navigationBar}
            renderScene={this.renderScene}
            initialRoute={{
              title: 'Links',
              type: 'LinksListing',
            }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

AppRegistry.registerComponent('chronreact', () => chronreact);
