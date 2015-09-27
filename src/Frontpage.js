const React = require('react-native');
const SectionPostListing = require('./SectionPostListing');

/**
 * Frontpage is a controller-view that renders a list of posts representing a
 * "Frontpage".
 */
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
