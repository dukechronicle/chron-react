const React = require('react-native');
const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#f8f8f8',
    fontWeight: '500',
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

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
};
