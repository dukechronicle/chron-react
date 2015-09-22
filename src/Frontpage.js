const React = require('react-native');
const SectionPostListing = require('./SectionPostListing');

const Frontpage = React.createClass({
  render: function() {
    const section = {
      name: 'Frontpage',
      slug: 'news',
    };
    return (
      <SectionPostListing
        section={section}
        navigator={this.props.navigator} />
    );
  },
});

module.exports = Frontpage;
