'use strict';

var React = require('react-native');
var SectionListing = require('./SectionListing');

var Frontpage = React.createClass({
  render: function() {
    var section = {
      name: 'Frontpage',
      slug: 'news',
    };
    return (
      <SectionListing
        section={section}
        navigator={this.props.navigator} />
    );
  },
});

module.exports = Frontpage;
