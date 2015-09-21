'use strict';

const React = require('react-native');
const {
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;
const helpers = require('./helpers.js');
const {
  LoadingView
} = helpers;
const PostListing = require('./components/PostListing');

const store = require('./store');
const postsCursor = store.select('models', 'posts');
const sectionIdsCursor = store.select('models', 'sectionIds');

const PostActionCreators = require('./actions/PostActionCreators');

const SectionPostListing = React.createClass({
  propTypes: {
    section: React.PropTypes.shape({
      name: React.PropTypes.string,
      slug: React.PropTypes.string,
    }),
  },

  getInitialState: function() {
    return {
      posts: [],
      loaded: false,
      error: undefined
    };
  },

  componentDidMount: function() {
    if (this.props.section.slug in sectionIdsCursor.get()) {
      this.updateState();
    } else {
      PostActionCreators.getSection(this.props.section.slug);
    }

    postsCursor.on('update', this.updateState);
    sectionIdsCursor.on('update', this.updateState);
  },

  componentWillUnmount: function() {
    postsCursor.off(this.updateState);
    sectionIdsCursor.off(this.updateState);
  },

  updateState: function() {
    const sectionPostIds = sectionIdsCursor.get()[this.props.section.slug];
    if (sectionPostIds) {
      const allPostsMap = postsCursor.get();
      const sectionPosts = sectionPostIds
        .filter((id) => id in allPostsMap)
        .map((id) => allPostsMap[id]);
      this.setState({
        posts: sectionPosts,
        loaded: true,
      });
    }
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <LoadingView />
      </View>
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
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  }
});

module.exports = SectionPostListing;
