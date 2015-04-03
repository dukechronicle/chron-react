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
    var caption;
    if (post.image && post.image.caption !== '') {
      caption = (
        <Text style={styles.caption}>{post.image.caption}</Text>
      );
    }
    var image;
    if (post.image) {
      image = (
        <Image
          style={styles.image}
          source={{uri: 'https:' + post.image.thumbnail_url}}
        />
      );
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{post.title}</Text>
          {caption}
          <HTMLView
            value={post.body}
            onLinkPress={(url) => console.log(url)}
            style={styles.body}
          />
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  scrollView: {
  },
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontWeight: '600',
    fontSize: 24,
  },
  image: {
    flex: 1,
    height: 250,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: -15,
    marginRight: -15
  },
  body: {
    fontFamily: 'Times'
  },
  caption: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 25
  }
});

module.exports = PostDetail;
