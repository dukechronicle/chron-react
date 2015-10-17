const React = require('react-native');
const {
  StyleSheet,
  TouchableHighlight,
  ListView,
  LinkingIOS,
  Text,
  View,
} = React;

const helpers = require('./helpers.js');
const { LoadingView } = helpers;

const LinksActionCreators = require('./actions/LinksActionCreators');

const store = require('./store');
const linksCursor = store.select('models', 'links');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    marginLeft: -15,
    marginRight: -15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
 * LinksListing is a list view of external links, that will open in the native
 * browser.
 */
const LinksListing = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true,
    };
  },

  componentDidMount: function() {
    if (linksCursor.get().length === 0) {
      LinksActionCreators.getLinks();
    } else {
      this.updateState();
    }
    linksCursor.on('update', this.updateState);
  },

  updateState: function() {
    const links = linksCursor.get();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(links),
      loaded: true,
    });
  },

  rowPressed: function(link) {
    // TODO: implement launching external links for android
    LinkingIOS.openURL(link.url);
  },

  renderLinkRow: function(link) {
    return (
      <TouchableHighlight
           onPress={() => this.rowPressed(link)}
           style={styles.highlight}
          underlayColor="#eeeeee">
        <View style={styles.row}>
          <Text>{link.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        <LoadingView style={styles.container} />
      );
    }
    return (
      <View style={styles.outerListView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderLinkRow}
          automaticallyAdjustContentInsets={false}
          style={styles.listView}
        />
      </View>
    );
  },
});

module.exports = LinksListing;
