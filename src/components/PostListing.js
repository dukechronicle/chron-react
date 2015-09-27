const React = require('react-native');
const {
  StyleSheet,
  TouchableHighlight,
  Image,
  ListView,
  Text,
  View,
} = React;

const HTMLView = require('react-native-htmlview');
const PostDetail = require('./PostDetail');
const { postPropTypes } = require('../utils/Post');
const RefreshableListView = require('react-native-refreshable-listview');
/**
 * PostListing is a component that renders a list of posts. It is a complement
 * to SectionPostListing that handles most of the display logic.
 */
const PostListing = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(postPropTypes).isRequired,
    navigator: React.PropTypes.object.isRequired,
    refresh:React.PropTypes.func.isRequired,
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

  renderLoadingView: function() {
    return (
      <LoadingView style={styles.container} />
    );
  },

  renderPost: function(post) {
    let image;
    if (post.images.length > 0) {
      image = (
          <Image
            source={{uri: post.images[0].thumbnailUrl}}
            style={styles.thumbnail}
          />
      );
    }
    const articleContainerStyles = [
      styles.articleContainer,
      post.images.length > 0 ? styles.rightContainer : null
    ];
    return (
      <TouchableHighlight
           onPress={() => this.rowPressed(post)}
           style={styles.highlight}
          underlayColor='#eeeeee'>
        <View style={styles.container}>
          {image}
          <View style={articleContainerStyles}>
            <Text numberOfLines={2} style={styles.title}>{post.title}</Text>
            <Text numberOfLines={2} style={styles.teaser}>{post.teaser}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  rowPressed: function(post) {
    this.props.navigator.push({
      title: post.title,
      component: PostDetail,
      passProps: {post: post}
    });
  },

  render: function() {
    return (
      <View style={styles.listView}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPost}
          loadData={this.props.refresh}
          automaticallyAdjustContentInsets={false}
          refreshDescription="Refreshing articles"
        />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  highlight: {
    marginLeft: -15,
    marginRight: -15,
  },
  articleContainer: {
    flex: 1,
  },
  rightContainer: {
    paddingLeft: 10
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
    height: 35,
    fontWeight: '600'
  },
  teaser: {
    textAlign: 'left',
    height: 35
  },
  thumbnail: {
    width: 103,
    height: 64
  },
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  }
});

module.exports = PostListing;
