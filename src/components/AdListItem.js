const React = require('react-native');
const {
  LinkingIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} = React;
import { scaleHeightToDevice } from '../utils/Image';

const ad = require('../../config/ad.json')['300x90'];

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
  onPress: function() {
    const { link } = ad;
    LinkingIOS.openURL(link);
  },

  render: function() {
    const { image } = ad;
    const scaledImageDim = scaleHeightToDevice({width: 300, height: 90});
    const imageStyle = {
      height: scaledImageDim.height,
      width: scaledImageDim.width,
    };
    return (
      <View style={styles.adContainer}>
        <TouchableHighlight onPress={this.onPress}>
          <Image
            source={{uri: image}}
            style={[imageStyle, styles.image]} />
        </TouchableHighlight>
      </View>
    );
  },
});
