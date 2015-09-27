const _ = require('underscore');
const store = require('../store');
const postsCursor = store.select('models', 'posts');
const sectionIdsCursor = store.select('models', 'sectionIds');
const { rawDataToPost } = require('../utils/Post');

/**
 * urlBuilder builds the url used to query for a section's articles.
 * @param {String} sectionSlug Section slug. Should mirror the slug used on the
 *     website.
 * @return {String} Url of the section API endpoint.
 */
const urlBuilder = (sectionSlug) => {
  return `http://www.dukechronicle.com/section/${sectionSlug}.json`;
}

/**
 * getSection issues an API request to retrieve the articles for a section. On a
 * successful request, it will populate postsCursor with the new article bodies
 * and will populate sectionIdsCursor with a list of ids for articles belonging
 * to the section.
 *
 * @param {String} section Section slug. Should mirror the slug used on the
 *     website.
 */
const getSection = (section) => {
  const p = fetch(urlBuilder(section))
    .then((response) => response.json())
    .then((responseData) => {
      const articles = responseData[0].articles;
      const articlesMap = _.object(
          _.map(_.values(articles), (a) => [a.uid, rawDataToPost(a)]));
      postsCursor.merge(articlesMap);
      sectionIdsCursor.merge({[section]: _.keys(articlesMap)});
    })
    .catch((error) => {
      console.warn(error);
      // TODO: change some view state
    });
  p.done();
  return p;
}

const PostActionCreators = {
  getFrontpage: () => {
    getSection('news');
  },
  getSection: (section) => {
    getSection(section);
  },
};

module.exports = PostActionCreators;
