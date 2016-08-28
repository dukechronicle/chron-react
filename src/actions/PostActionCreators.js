const _ = require('underscore');
const store = require('../store');
const postsCursor = store.select('models', 'posts');
const sectionIdsCursor = store.select('models', 'sectionIds');
const { rawDataToPost } = require('../utils/Post');
/**
 * sectionUrlBuilder builds the url used to query for a section's articles.
 * @param {String} sectionSlug Section slug. Should mirror the slug used on the
 *     website.
 * @return {String} Url of the section API endpoint.
 */
const urlBuilder = (sectionName, pageNumber) => {
  if (sectionName !== 'frontpage') {
    return `http://www.dukechronicle.com/${sectionName}/.json?page=${pageNumber}`;
  } else {
    return 'http://www.dukechronicle.com/.json';
  }
};

const postUrlBuilder = (slug) => {
  // strips leading and trailing slashes
  const stripped = slug.replace(/^\/|\/$/g, '');
  return `http://www.dukechronicle.com/article/${stripped}.json`;
};

/**
 * getSection issues an API request to retrieve the articles for a section. On a
 * successful request, it will populate postsCursor with the new article bodies
 * and will populate sectionIdsCursor with a list of ids for articles belonging
 * to the section.
 *
 * @param {String} section Section slug. Should mirror the slug used on the
 *     website.
 */

const getSection = (section, number) => {
  const p = fetch(urlBuilder(section, number))
    .then((response) => response.json())
    .then((responseData) => {
      const articles = section == "blog/blue-zone" ? responseData[0].posts : responseData[0].articles;
      const articlesMap = _.object(
          _.map(_.values(articles), (a) => [a.uid, rawDataToPost(a)]));
      postsCursor.merge(articlesMap);
      const sectionCursor = sectionIdsCursor.select(section);
      if (_.isUndefined(sectionCursor.get())) {
        sectionCursor.set(_.keys(articlesMap));
      } else {
        sectionCursor.push(_.keys(articlesMap));
      }
    })
    .catch((error) => {
      console.warn(error);
      // TODO: change some view state
    });
  p.done();
  return p;
};

const getPost = (slug) => {
  const p = fetch(postUrlBuilder(slug))
    .then((response) => response.json())
    .then((responseData) => {
      const article = rawDataToPost(responseData[0].article);
      postsCursor.merge({[slug]: article});
    })
    .catch((error) => {
      console.warn(error);
      // TODO: change some view state
    });
  p.done();
  return p;
};

const PostActionCreators = {
  getFrontpage: getSection.bind(null, 'frontpage'),
  getSection: getSection,
  getPost: getPost,
};
module.exports = PostActionCreators;
