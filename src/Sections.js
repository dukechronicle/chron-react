var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var helpers = require('./helpers.js');
var { LoadingView } = helpers;
var SectionListing = require('./SectionListing');

var SectionActionCreators = require('./actions/SectionActionCreators');

var store = require('./store');
var postsCursor = store.select('models', 'posts');
var sectionIdsCursor = store.select('models', 'sectionIds');
var sectionsCursor = store.select('models', 'topLevelSections');

var Sections = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },

  componentDidMount() {
    if (sectionsCursor.get().length === 0) {
      SectionActionCreators.getSections();
    } else {
      this.updateState();
    }
    sectionsCursor.on('update', this.updateState);
  },

  componentWillUnmount() {
    sectionsCursor.off('update', this.updateState);
  },

  updateState() {
    var sections = sectionsCursor.get();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sections),
      loaded: true,
    });
  },

  rowPressed(section) {
    this.props.navigator.push({
      title: section.name,
      component: SectionListing,
      passProps: {section: section}
    });
  },

  _renderSectionRow(section) {
    return (
      <TouchableHighlight
           onPress={() => this.rowPressed(section)}
           style={styles.highlight}
          underlayColor='#eeeeee'>
        <View style={styles.row}>
          <Text>{section.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  _renderSections() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderSectionRow}
          automaticallyAdjustContentInsets={false}
          style={styles.listView}
        />
      </View>
    );
  },
  render() {
    if (!this.state.loaded) {
      return (
        <LoadingView style={styles.container} />
      );
    } else {
      return this._renderSections();
    }
  }
});

var styles = StyleSheet.create({
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
    borderColor: '#DDDDDD'
  },
  listView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 64,
    marginBottom: 44,
  }
})

module.exports = Sections;
