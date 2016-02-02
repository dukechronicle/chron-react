const _ = require('underscore');
const React = require('react-native');
const SectionPostListing = require('./SectionPostListing');

const { frontpageSort } = require('./utils/Post');
import { intersperseAds } from './utils/Ad';

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
    const transform = _.compose(intersperseAds, frontpageSort);
    return (
      <SectionPostListing
        section={section}
        postsTransform={transform}
        navigator={this.props.navigator} />
    );
  },
});

module.exports = Frontpage;
