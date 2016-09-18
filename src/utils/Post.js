const _ = require('underscore');
const he = require('he');
const React = require('react-native');
const urlencode = require('urlencode');

import { extractHtmlText } from './dom';
import { getWindowDimensions } from './Image';

// Strings are urlencoded with utf-8 and also include HTML entities.
const unescape = (str) => he.unescape(urlencode.decode(str));

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
 * Returns true if the tag name is a tag used internally, or if it has some
 * useful meaning to the user.
 * @param {String} tagName A string representing the tag name.
 * @return {Boolean}
 */
const isInternalTag = (tagName) => {
  const invalidRegexes = [
    /top/gi,
    /newsletter/i,
    /hot/i,
    /homepage/i,
    /columnist/i,
  ];
  return _.some(invalidRegexes.map((re) => re.test(tagName)));
};

/**
 * Return the max length of the tag string based on
 * the width of the device
 */
const getMaxTagLength = () => {
  const width = getWindowDimensions().width;
  switch (width) {
  case 320: return 23;
  case 375: return 29;
  case 414: return 34;
  default: return 34;
  }
};

/**
 * Generate a tag string for a post listing. This string is
 * limited depending on the device width
 * TODO: Do this in css if possible
 * @param {Array} tags - tags to be maped to a tag string
 * @return {String} A tags string limited to a certain number
 * of characters (based on device width)
 */
const computeTagString = (tags) => {
  let tagsString = tags
    .map((t) => t.name.toUpperCase())
    .filter((t) => !isInternalTag(t))
    .join(', ');
  const maxLen = getMaxTagLength();
  if (tagsString.length > maxLen) {
    tagsString = tagsString.substring(0, maxLen) + '...';
  }
  return tagsString;
};

/**
 * Sorts 'articles' so that articles are chronological and unique
 * @param {Array} articles An array of articles that follow the structure in
 *   postPropTypes
 * @return {Array} For now just return the articles, this function will
 * remain for now in case custom logic needs to be implemented later on
 */
const frontpageSort = (articles) => {
  return articles;
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
    url: unescape(a.getURL),
  };
};

/**
 * Function to get the human readable part of the articles published date
 * @param {String} pubString - Full published string
 * @param {Boolean} zone - Boolean determining whether to include time zone
 * @return {String} The stripped string
 */
export const getPublishedDate = (pubString, zone = true) => {
  if (zone) {
    const pieces =  /([a-zA-Z]+ [a-zA-Z]+ [0-9]+ [0-9]+).*(\([A-Z]+\))/.exec(pubString);
    return `${pieces[1]} ${pieces[2]}`;
  }
  return /([a-zA-Z]+ [a-zA-Z]+ [0-9]+ [0-9]+)/.exec(pubString)[1];
};

/**
 * PropTypes for a post.
 */
const postPropTypes = React.PropTypes.shape({
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  image: React.PropTypes.shape({
    thumbnail_url: React.PropTypes.string,
    caption: React.PropTypes.string,
  }),
});

module.exports = {
  frontpageSort,
  isInternalTag,
  rawDataToPost,
  postPropTypes,
  computeTagString,
  getPublishedDate,
};
