'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ActivityIndicatorIOS,
  NavigatorIOS,
  TouchableHighlight,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var API_URL = 'https://api.dukechronicle.com/qduke';

var PostDetail = require('./PostDetail');

var Frontpage = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
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
          dataSource: this.state.dataSource.cloneWithRows(newsPosts),
          loaded: true
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <ActivityIndicatorIOS
        hidden='true'
        size='large'
        style={styles.container}
      />
    );
  },
  renderPost: function(post) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(post)}
          underlayColor='#eeeeee'>
        <View style={styles.container}>
          <Image
            source={{uri: 'http:' + post.image.thumbnail_url}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
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
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  rightContainer: {
    flex: 1,
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
    paddingRight: 15
  }
});

module.exports = Frontpage;
