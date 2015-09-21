const _ = require('underscore');
const store = require('../store');
const postsCursor = store.select('models', 'posts');
const sectionIdsCursor = store.select('models', 'sectionIds');
const { rawDataToPost } = require('../utils/Post');

const urlBuilder = (sectionName) => {
  return `http://www.dukechronicle.com/section/${sectionName}.json`;
}

const getSection = (section) => {
  fetch(urlBuilder(section))
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
    })
    .done();
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
