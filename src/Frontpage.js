const React = require('react-native');
const SectionPostListing = require('./SectionPostListing');

const { frontpageSort } = require('./utils/Post');

/**
 * Frontpage is a controller-view that renders a list of posts representing a
 * "Frontpage".
 */
const Frontpage = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function render() {
    const section = {
      name: 'Frontpage',
      slug: 'frontpage',
    };
    return (
      <SectionPostListing
        section={section}
        postSort={frontpageSort}
        navigator={this.props.navigator} />
    );
  },
});

module.exports = Frontpage;
