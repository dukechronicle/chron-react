const React = require('react-native');
const {
  StyleSheet,
  TouchableHighlight,
  Image,
  ListView,
  Text,
  View,
} = React;

const PostDetail = require('./PostDetail');
const {
  isInternalTag,
  postPropTypes,
} = require('../utils/Post');
const RefreshableListView = require('react-native-refreshable-listview');

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
  sections: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  thumbnail: {
    marginRight: -10,
    marginLeft: -10,
    marginBottom: 15,
    height: 250,
  },
  outerListView: {
    flex: 1,
  },
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  },
});

/**
 * PostListing is a component that renders a list of posts. It is a complement
 * to SectionPostListing that handles most of the display logic.
 */
const PostListing = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(postPropTypes).isRequired,
    navigator: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.updateDataSource(this.props.posts);
  },

  componentWillReceiveProps: function(nextProps) {
    this.updateDataSource(nextProps.posts);
  },

  updateDataSource: function(posts) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(posts),
    });
  },

  rowPressed: function(post) {
    console.log(post);
    this.props.navigator.push({
      title: post.title,
      component: PostDetail,
      passProps: {post: post},
    });
  },

  renderPost: function(post) {
    let image;
    if (post.images.length > 0) {
      image = (
          <Image
            source={{uri: post.images[0].thumbnailUrl}}
            resizeMode={Image.resizeMode.contain}
            style={styles.thumbnail}
          />
      );
    }
    const tagsString = post.tags
      .map((t) => t.name.toUpperCase())
      .filter((t) => !isInternalTag(t))
      .join(', ');
    return (
      <TouchableHighlight
           onPress={() => this.rowPressed(post)}
           style={styles.highlight}
          underlayColor="#eeeeee">
        <View style={styles.postRowContainer}>
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

  render: function() {
    return (
      <View style={styles.outerListView}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPost}
          loadData={this.props.refresh}
          automaticallyAdjustContentInsets={false}
          refreshDescription="Refreshing articles"
          style={styles.listView}
        />
      </View>
    );
  },
});

module.exports = PostListing;
