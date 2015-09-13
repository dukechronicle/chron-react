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
var { postPropTypes } = require('../utils/Post');

var PostDetail = React.createClass({
  propTypes: {
    post: postPropTypes.isRequired,
  },

  render: function() {
    var post = this.props.post;
    var caption;
    if (post.images.length > 0 && post.images[0].caption !== '') {
      caption = (
        <Text style={styles.caption}>{post.images[0].caption}</Text>
      );
    }
    var byline;
    if (post.authors){
      byline = (
        <Text style={styles.byline}>By {post.authors.join(", ")}</Text>
      );
    }
    var image;
    if (post.images.length > 0) {
      image = (
        <Image
          style={styles.image}
          source={{uri: post.images[0].previewUrl}}
        />
      );
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{post.title}</Text>
          {image}
          {caption}
          {byline}
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
    flex: 1,
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
  },
  byline: {
    marginTop: 15,
    marginBottom: 14
  }
});

module.exports = PostDetail;
