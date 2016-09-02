const _ = require('underscore');
const React = require('react-native');
const {
  StyleSheet,
  ListView,
  View,
} = React;

const PostDetail = require('./PostDetail');
const {
  postPropTypes,
} = require('../utils/Post');
import { PostListRow } from './PostListRow';
import { AdListItem } from './AdListItem';
const RefreshableListView = require('react-native-refreshable-listview');
const InfiniteScrollView = require('react-native-infinite-scroll-view');

const store = require('../store');
const tabCursor = store.select('views', 'tab');
const scrollCursor = store.select('views', 'scrollToTop');

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
  /**
   * 'refresh' is a function that is called when the list view is
   * pull-to-refreshed by the user. It should return a promise that is
   * fulfilled when the refreshing is complete.
   *
   * 'postsTransform' is a function that takes in a list of posts and returns a
   * transformed (e.g. sorted, filtered) list of posts. By default,
   * postsTransform is the identity function.
   */
  propTypes: {
    posts: React.PropTypes.arrayOf(postPropTypes).isRequired,
    navigator: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func.isRequired,
    onLoadMoreAsync: React.PropTypes.func.isRequired,
    postsTransform: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      postsTransform: _.identity,
    };
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
    scrollCursor.on('update', () => {
      const tab = tabCursor.get();
      if (scrollCursor.get(tab))  {
        this.scrollTop();
        // reset state of scrolling
        scrollCursor.set(tab, false);
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.updateDataSource(nextProps.posts);
  },

  updateDataSource: function(posts) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this.props.postsTransform(posts)),
    });
  },

  scrollTop: function() {
    if (this.listView) {
      this.listView.refs.listview.getScrollResponder().scrollTo({y: 0});
    }
  },

  rowPressed: function(post) {
    this.props.navigator.push({
      title: '',
      component: PostDetail,
      passProps: {post: post, navigator: this.props.navigator},
    });
  },

  renderRow: function(data) {
    if (data.ad) {
      return <AdListItem />;
    } else {
      return (
        <PostListRow
          post={data}
          rowPressed={this.rowPressed} />
      );
    }
  },

  render: function() {
    return (
      <View style={styles.outerListView}>
        <RefreshableListView
          ref = {(listView) => {this.listView = listView;}}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          loadData={this.props.refresh}
          automaticallyAdjustContentInsets={false}
          distanceToLoadMore={200}
          refreshDescription="Refreshing articles"
          style={styles.listView}
          onLoadMoreAsync={this.props.onLoadMoreAsync}
          canLoadMore
        />
      </View>
    );
  },
});

module.exports = PostListing;
