const React = require('react-native');
const {
  LinkingIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
} = React;

const styles = StyleSheet.create({
  ad: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: -15,
    marginRight: -15,
    padding: 0,
    borderBottomWidth: 7,
    borderColor: '#DDDDDD',
    height: 110,
  },
  image: {
    flex: 1,
    height: 110,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export const AdListItem = React.createClass({
  getInitialState: function() {
    // 300x90 ad
    const imgSrc = `http://engine.adzerk.net/s/370539/0/121/77416678`;
    const linkSrc = `http://engine.adzerk.net/s/redirect/370539/0/121/77416678`;
    return {
      imgSrc,
      linkSrc,
    };
  },

  onPress: function() {
    LinkingIOS.openURL(this.state.linkSrc);
  },

  render: function() {
    return (
      <TouchableHighlight style={styles.ad} onPress={this.onPress}>
        <Image source={{uri: this.state.imgSrc}} style={styles.image} />
      </TouchableHighlight>
    );
  },
});
