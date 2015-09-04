var _ = require('underscore');
var extractHtmlText = require('../helpers').extractHtmlText;
var React = require('react-native');

var rawDataToPost = (a) => {
  return {
    title: unescape(a.headline),
    body: unescape(a.copy),
    teaser: extractHtmlText(unescape(a.abstract)),
    published: new Date(a.published * 1000),
    authors: _.map(_.values(a.getAuthor), (author) => unescape(author)),
  };
};

var postPropTypes = React.PropTypes.shape({
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  image: React.PropTypes.shape({
    thumbnail_url: React.PropTypes.string,
    caption: React.PropTypes.string,
  }),
});

module.exports = {
  rawDataToPost,
  postPropTypes,
};
