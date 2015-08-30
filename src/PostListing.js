'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var HTMLView = require('react-native-htmlview');
var PostDetail = require('./PostDetail');

var PostListng = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
    navigator: React.PropTypes.object,
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
    var image;
    if (post.image) {
      image = (
          <Image
            source={{uri: 'http:' + post.image.thumbnail_url}}
            style={styles.thumbnail}
          />
      );
    }
    var articleContainerStyles = [
      styles.articleContainer,
      post.image ? styles.rightContainer : null
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
      <View style={styles.outerListView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPost}
          automaticallyAdjustContentInsets={false}
          style={styles.listView}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  outerListView: {
    flex: 1,
  },
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

module.exports = PostListng;
