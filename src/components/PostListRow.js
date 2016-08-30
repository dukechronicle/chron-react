const React = require('react-native');
const {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View,
} = React;

const {
  isInternalTag,
  postPropTypes,
} = require('../utils/Post');

const styles = StyleSheet.create({
  postRowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 7,
    borderColor: '#DDDDDD',
  },
  postRowImageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 7,
    borderColor: '#DDDDDD',
  },
  highlight: {
    marginLeft: -15,
    marginRight: -15,
  },
  articleContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  tags: {
    fontSize: 13,
    color: '#333',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '600',
    marginBottom: 3,
  },
  teaser: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 3,
  },
  thumbnail: {
    marginBottom: 15,
    height: 250,
  },
});

/**
 * PostListRow is a view that is used inside of list views to render a Post.
 */
export const PostListRow = React.createClass({
  /**
   * 'post' is a post.
   *
   * 'rowPressed' is a function that is called when the view is pressed.
   */
  propTypes: {
    post: postPropTypes,
    rowPressed: React.PropTypes.func.isRequired,
  },

  render: function() {
    const post = this.props.post;
    let image;
    if (post.images.length > 0) {
      image = (
        <Image
          source={{uri: post.images[0].thumbnailUrl}}
          resizeMode={Image.resizeMode.stretch}
          style={styles.thumbnail} />
      );
    }
    const tagsString = post.tags
      .map((t) => t.name.toUpperCase())
      .filter((t) => !isInternalTag(t))
      .join(', ');
    const postRowStyle = post.images.length > 0 ?
          styles.postRowImageContainer:
          styles.postRowContainer;
    return (
      <TouchableHighlight
        onPress={() => this.props.rowPressed(post)}
        style={styles.highlight}
        underlayColor="#eeeeee">
        <View style={ postRowStyle }>
          {image}
          <View style={styles.articleContainer}>
            <Text numberOfLines={1} style={styles.tags}>{tagsString}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text numberOfLines={3} style={styles.teaser}>{post.teaser}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});
