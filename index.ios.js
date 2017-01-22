import React from 'react';
import {
  AppRegistry,
  Linking,
  Navigator,
  PushNotificationIOS,
  StyleSheet,
  StatusBar,
  TabBarIOS,
} from 'react-native';

const _ = require('underscore');

const Frontpage = require('./src/Frontpage');
const LinksListing = require('./src/LinksListing');
const PostDetailLoader = require('./src/PostDetailLoader');
const Sections = require('./src/Sections');

const NavigationActionCreators = require('./src/actions/NavigationActionCreators');
const PostActionCreators = require('./src/actions/PostActionCreators');

const { NavigationBarRouteMapper } = require('./src/NavigationBarRouteMapper.ios');

const { registerPushIOS } = require('./src/PushNotification');

import { stripDeepLink } from './src/utils/Post'

const store = require('./src/store');
const tabCursor = store.select('views', 'tab');
const scrollCursor = store.select('views', 'scrollToTop');

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
    StatusBar.setBarStyle('light-content');
    Linking.addEventListener('url', this._handleOpenURL);

    Linking.getInitialURL().then((url) => {
      if (!_.isNull(url)) {
        const slug = stripDeepLink(url);
        this.openPost(slug);
      }
    });
    
    // Get a remote notification on application start, or listen for notifications
    // while the application is open IN THE FOREGROUND. Note that this will not 
    // listen for notifications that occur while the app is in the background state
    registerPushIOS();
    PushNotificationIOS.getInitialNotification().then(this.onNotification);
    PushNotificationIOS.addEventListener('notification', this.onNotification);
  },

  componentWillUnmount() {
    tabCursor.off('change', this.updateTab);
    Linking.removeEventListener('url', this._handleOpenURL);
    PushNotificationIOS.removeEventListener('notification', this.onNotification);
  },

  /*
   * Expects notification object to have a '_data' key that maps to an object,
   * which should have 'com.batch' as a key, which should finally have 'l' as a
   * key mapping to the full deeplink url
   */
  onNotification(notification) {
    if (!(_.isUndefined(notification) || _.isNull(notification))) {
      const url = notification._data['com.batch'].l;
      const slug = stripDeepLink(url);
      this.openPost(slug);
    }
  },

  _handleOpenURL(e) {
    const url = e.url;
    if (!_.isNull(url)) {
      const slug = stripDeepLink(url);
      this.openPost(slug);
    }
  },

  updateTab() {
    this.setState({
      selectedTab: tabCursor.get(),
    });
  },

  tabIsSelected(name) {
    return this.state.selectedTab === name;
  },

  scrollTop(tab) {
    tab.refs.postListing.scrollTop();
  },

  switchTabHandler(name) {
    return () => {
      // if we are already on this tab
      if (this.state.selectedTab === name) {
        scrollCursor.set(name, true);
      }
      NavigationActionCreators.selectSection(name);
      this.setState({selectedTab: name});
    };
  },

  openPost(slug) {
    PostActionCreators.getPost(slug);
    this.refs.frontpageNav.push({
      title: '',
      component: PostDetailLoader,
      passProps: {
        slug,
      },
    });
  },

  renderScene: function(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        {...route.passProps} />
    );
  },

  renderNavigationBar: function() {
    return (
      <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}
        style={styles.navBar}
        />
    );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Main"
          selected={this.tabIsSelected('frontpage')}
          icon={{uri: 'newspaper', scale: 3}}
          onPress={this.switchTabHandler('frontpage')} >
          <Navigator
            ref="frontpageNav"
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            initialRoute={{
              title: 'The Chronicle',
              component: Frontpage,
              titleStyleOverride: {
                fontFamily: 'Didot',
                fontSize: 20,
              },
            }}
            navigationBar={this.renderNavigationBar()}
            renderScene={this.renderScene} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Sections"
          selected={this.tabIsSelected('sections')}
          icon={{uri: 'sections', scale: 3}}
          onPress={this.switchTabHandler('sections')} >
          <Navigator
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            navigationBar={this.renderNavigationBar()}
            renderScene={this.renderScene}
            initialRoute={{
              title: 'Sections',
              component: Sections,
            }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Links"
          selected={this.tabIsSelected('links')}
          icon={{uri: 'link', scale: 3}}
          onPress={this.switchTabHandler('links')} >
          <Navigator
            style={styles.container}
            barTintColor="#083e8c"
            tintColor="#eee"
            titleTextColor="#eee"
            navigationBar={this.renderNavigationBar()}
            renderScene={this.renderScene}
            initialRoute={{
              title: 'Links',
              component: LinksListing,
            }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

AppRegistry.registerComponent('chronreact', () => chronreact);
