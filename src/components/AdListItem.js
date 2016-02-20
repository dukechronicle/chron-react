const React = require('react-native');
const {
  LinkingIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} = React;
import { scaleHeightToDevice } from '../utils/Image';

const styles = StyleSheet.create({
  adContainer: {
    flex: 1,
    borderColor: '#DDDDDD',
    borderBottomWidth: 7,
    marginLeft: -15,
    marginRight: -15,
  },
  image: {
    flex: 1,
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
    const scaledImageDim = scaleHeightToDevice({width: 300, height: 90});
    const imageStyle = {
      height: scaledImageDim.height,
      width: scaledImageDim.width,
    };
    return (
      <View style={styles.adContainer}>
        <TouchableHighlight onPress={this.onPress}>
          <Image
            source={{uri: this.state.imgSrc}}
            style={[imageStyle, styles.image]} />
        </TouchableHighlight>
      </View>
    );
  },
});
