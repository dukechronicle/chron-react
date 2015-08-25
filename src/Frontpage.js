'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  Text,
} = React;
var helpers = require('./helpers.js');
var {
  LoadingView
} = helpers;
var PostListing = require('./PostListing');

var store = require('./store');
var postsCursor = store.select('models', 'posts');
var sectionIdsCursor = store.select('models', 'sectionIds');

var PostActionCreators = require('./actions/PostActionCreators');

var Frontpage = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      loaded: false,
      error: undefined
    };
  },

  componentDidMount: function() {
    if ('news' in sectionIdsCursor.get()) {
      updateState();
    } else {
      PostActionCreators.getQDuke();
    }

    postsCursor.on('update', this.updateState);
    sectionIdsCursor.on('update', this.updateState);
  },

  updateState: function() {
    var news = sectionIdsCursor.get().news;
    if (news) {
      var postsMap = postsCursor.get();
      var posts = news
        .filter((id) => id in postsMap)
        .map((id) => postsMap[id]);
      this.setState({
        posts: posts,
        loaded: true,
      });
    }
  },

  renderLoadingView: function() {
    return (
      <LoadingView style={styles.container} />
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    if (this.state.error !== undefined) {
      return (
        <Text style={styles.listView}>
          {this.state.error}
        </Text>
      )
    } else {
      return (
        <PostListing
          posts={this.state.posts}
          navigator={this.props.navigator} />
      );
    }
  },
});

var styles = StyleSheet.create({
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
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  }
});

module.exports = Frontpage;
