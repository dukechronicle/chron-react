const React = require('react-native');
const {
  View,
} = React;
const PostDetail = require('./components/PostDetail');

const _ = require('underscore');

const helpers = require('./helpers.js');
const { LoadingView } = helpers;

const store = require('./store');

const styles = {};

const PostDetailLoader  = React.createClass({
  propTypes: {
    slug: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      post: undefined,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.cursor = store.select('models', 'posts', this.props.slug);
    this.cursor.on('update', this.updateState);
    this.updateState();
  },

  updateState: function() {
    const post = this.cursor.get();
    if (!_.isUndefined(post)) {
      this.setState({
        post,
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
    return (
      <PostDetail post={this.state.post} />
    );
  },
});

module.exports = PostDetailLoader;
