const store = require('../store');
const sectionsCursor = store.select('models', 'topLevelSections');

const SectionActionCreators = {
  getSections: () => {
    const sections = [
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
