import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const helpers = require('./helpers.js');
const { LoadingView } = helpers;
const SectionPostListing = require('./SectionPostListing');

const SectionActionCreators = require('./actions/SectionActionCreators');

const store = require('./store');
const sectionsCursor = store.select('models', 'topLevelSections');
const pagesCursor = store.select('models', 'pages');

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
 * Sections is a list view of sections, that allows navigation between different
 * sections.
 */
const Sections = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    if (sectionsCursor.get().length === 0) {
      SectionActionCreators.getSections();
    } else {
      this.updateState();
    }
    sectionsCursor.on('update', this.updateState);
  },

  componentWillUnmount: function() {
    sectionsCursor.off('update', this.updateState);
  },

  getPages: function() {
    return pagesCursor.get();
  },

  updateState: function() {
    const sections = sectionsCursor.get();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sections),
      loaded: true,
    });
  },

  rowPressed: function(section) {
    this.props.navigator.push({
      title: section.name,
      component: SectionPostListing,
      passProps: {section: section},
    });
  },

  _renderSectionRow: function(section) {
    return (
      <TouchableHighlight
           onPress={() => this.rowPressed(section)}
           style={styles.highlight}
          underlayColor="#eeeeee">
        <View style={styles.row}>
          <Text>{section.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  _renderSections: function() {
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
  render: function() {
    if (!this.state.loaded) {
      return (
        <LoadingView style={styles.container} />
      );
    }
    return this._renderSections();
  },
});

module.exports = Sections;
