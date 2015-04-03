var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  WebView
} = React;
var HTMLView = require('react-native-htmlview');

var PostDetail = React.createClass({
  render: function() {
    var post = this.props.post;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{post.title}</Text>
          <Image
            style={styles.image}
            source={{uri: 'https:' + post.image.thumbnail_url}}
          />
          <HTMLView
            value={post.body}
            onLinkPress={(url) => console.log(url)}
          />
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  scrollView: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontWeight: '600',
    fontSize: 24
  },
  image: {
    flex: 1,
    height: 200,
    marginTop: 15,
    marginBottom: 25
  }
});

module.exports = PostDetail;
