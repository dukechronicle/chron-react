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

var API_URL = 'https://api.dukechronicle.com/qduke';


var Frontpage = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      loaded: false,
      error: undefined
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        var articlesMap = responseData.articles;
        var newsPosts = responseData.layout.news.map((id) => articlesMap[id]);
        this.setState({
          posts: newsPosts,
          loaded: true,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          error: 'Could not load articles, please try again.',
        });
      })
      .done();
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
