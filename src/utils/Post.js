const _ = require('underscore');
const extractHtmlText = require('../helpers').extractHtmlText;
const he = require('he');
const React = require('react-native');
const urlencode = require('urlencode');

// Strings are urlencoded with utf-8 and also include HTML entities.
const unescape = (str) => he.unescape(urlencode.decode(str))

/**
 * Helper function to clean media objects from the API.
 * @param {Object} m Media object from the API.
 * @return {Object} A nicer, unescaped version of the media.
 */
const cleanMedia = (m) => {
  return {
    caption: extractHtmlText(unescape(m.caption)),
    authors: _.map(_.values(m.getAuthor), (author) => unescape(author)),
    thumbnailUrl: unescape(m.urlThumbnail),
    previewUrl: unescape(m.urlPreview),
    originalUrl: unescape(m.originalUrl),
  };
};

/**
 * Helper function to clean tag objects from the API.
 * @param {Object} t Tag object from the API.
 * @return {Object} A nicer, unescaped version of the tag.
 */
const cleanTag = (t) => {
  return {
    name: unescape(t.name),
  };
};

/**
 * Helper function to clean post objects from the API.
 * @param {Object} a Post object from the API.
 * @return {Object} A nicer, unescaped version of the post.
 */
const rawDataToPost = (a) => {
  return {
    title: unescape(a.headline),
    body: unescape(a.copy),
    teaser: extractHtmlText(unescape(a.abstract)),
    published: new Date(a.published * 1000),
    authors: _.map(_.values(a.getAuthor), (author) => unescape(author)),
    images: _.map(_.values(a.media), cleanMedia),
    tags: _.map(_.values(a.tags), cleanTag),
  };
};

/**
 * PropTypes for a post.
 */
const postPropTypes = React.PropTypes.shape({
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
