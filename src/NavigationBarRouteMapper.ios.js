import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  View,
} from 'react-native';

import PostDetail from './components/PostDetail'
import NavigatorTitle from './components/navigator/Title';

const styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarLeftArrow: {
    paddingRight: 10,
    fontFamily: 'Apple SD Gothic Neo',
    fontWeight: '800',
  },
  navBarButtonText: {
    color: '#f8f8f8',
  },
});

/*
 * Object that maps the navigation bar text to a partifcular route. Contains functions
 * to create the left, & right button and the Title
 */
export const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
          onPress={() => navigator.pop()}
          style={styles.navBarLeftButton}>
        <View>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            <Text style={styles.navBarLeftArrow}>{"〈  "}</Text>
            {previousRoute.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  /*
   * Currently only render the right button if the route is an article, in which case 
   * it is a share button that opens an IOS action sheet to share the URL of the article
   */
  RightButton: function(route, navigator, index, navState) {
    if (route.component === PostDetail) {
      const { url, title } = route.passProps.post;
      return (
        <TouchableOpacity
            onPress={() => {
              ActionSheetIOS.showShareActionSheetWithOptions({
                url,
                subject: title,
              }, 
              (error) => alert(error), 
              (sucess, method) => { })
            }}
            style={styles.navBarRightButton}>
          <View>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Share
            </Text>
          </View>  
        </TouchableOpacity>
      )
    }
    return null
  },

  Title: function(route) {
    return (
      <NavigatorTitle
        styleOverride={route.titleStyleOverride}
        text={route.title} />
    );
  },
};
