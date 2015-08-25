var store = require('../store');
var postsCursor = store.select('models', 'posts');
var sectionIdsCursor = store.select('models', 'sectionIds');

var API_URL = 'https://api.dukechronicle.com/qduke';

var PostActionCreators = {
  getQDuke: () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        var articlesMap = responseData.articles;
        postsCursor.merge(articlesMap);
        sectionIdsCursor.merge(responseData.layout);
      })
      .catch((error) => {
        console.warn(error);
        // TODO: change some view state
      })
      .done();
  }
};

module.exports = PostActionCreators;
