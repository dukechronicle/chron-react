import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  View,
} from 'react-native';

import NavigatorTitle from './components/navigator/Title';

const styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarLeftButton: {
    paddingLeft: 10,
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
    // if (!route.navState)
    console.log(route)
    console.log(navigator)
    console.log(index)
    console.log(navState)
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
