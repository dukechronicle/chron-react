const _ = require('underscore');
const React = require('react-native');
const {
  StyleSheet,
  Text,
  View,
} = React;
const helpers = require('./helpers.js');
const {
  LoadingView,
} = helpers;
const PostListing = require('./components/PostListing');

const store = require('./store');
const postsCursor = store.select('models', 'posts');
const sectionIdsCursor = store.select('models', 'sectionIds');
const pagesCursor = store.select('models', 'pages');

const PostActionCreators = require('./actions/PostActionCreators');

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
    borderColor: '#DDDDDD',
  },
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  },
});

/**
 * SectionPostListing is a controller-view that renders a list view of posts
 * belonging to a section.
 */
const SectionPostListing = React.createClass({
  /**
   * 'section' is an object that has the name of the section and the slug of the
   * section. The name is used for display purposes, and the slug is used when
   * querying the store and issuing a getSection action. The slug should match
   * the same slug that is used on the website.
   */
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
    section: React.PropTypes.shape({
      name: React.PropTypes.string,
      slug: React.PropTypes.string,
    }),
    postSort: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      postSort: _.identity,
    };
  },

  getInitialState: function() {
    return {
      posts: [],
      loaded: false,
      error: undefined,
    };
  },

  componentDidMount: function() {
    if (this.props.section.slug in sectionIdsCursor.get()) {
      this.updateState();
    } else {
      this.reloadArticles();
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

  loadNextPage: function(){
    console.log("Loading Next Page");
    const pageNumber = pagesCursor.get(this.props.section.slug);
    pagesCursor.set(this.props.section.slug, pageNumber+1)
    return PostActionCreators.getSection(this.props.section.slug, pageNumber+1);
  },

  reloadArticles: function() {
    return PostActionCreators.getSection(this.props.section.slug, 1);
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
      );
    }
    return (
      <PostListing
        posts={this.props.postSort(this.state.posts)}
        navigator={this.props.navigator}
        refresh={this.reloadArticles}
        onLoadMoreAsync = {this.loadNextPage}/>
    );
  },
});

module.exports = SectionPostListing;
