var store = require('../store');
var sectionsCursor = store.select('models', 'topLevelSections');

var SectionActionCreators = {
  getSections: () => {
    var sections = [
      ['news', 'News'],
      ['sports', 'Sports'],
      ['opinion', 'Opinion'],
      ['recess', 'Recess'],
      ['towerview', 'Towerview'],
      ['blue-zone', 'Blue Zone'],
    ].map(([slug, name]) => { return {slug, name} });
    sectionsCursor.set(sections);
  }
};

module.exports = SectionActionCreators;
