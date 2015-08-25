var store = require('../store');
var sectionsCursor = store.select('models', 'topLevelSections');

var API_URL = 'https://api.dukechronicle.com/sections?limit=100';

var SectionActionCreators = {
  getSections: () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((resData) => {
        var topLevel = resData.filter((sec) => sec.parent_id === null)
        sectionsCursor.set(topLevel);
      })
      .catch((error) => {
        console.warn(error);
      })
      .done()
  }
};

module.exports = SectionActionCreators;
