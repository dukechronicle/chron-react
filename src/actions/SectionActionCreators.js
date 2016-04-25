const store = require('../store');
const _ = require('underscore');
const sectionsCursor = store.select('models', 'topLevelSections');
const pagesCursor = store.select('models', 'pages');

const SectionActionCreators = {
  getSections: () => {
    const sections = [
      ['section/news', 'News'],
      ['section/sports', 'Sports'],
      ['section/opinion', 'Opinion'],
      ['section/recess', 'Recess'],
      ['section/towerview', 'Towerview'],
      ['blog/blue-zone', 'Blue Zone'],
    ].map(([slug, name]) => { return {slug, name}; });
    sectionsCursor.set(sections);
    const pageNumber = sections.map(({slug}) => { return [slug, 0]; });
    pagesCursor.set(_.object(pageNumber));
  },
};

module.exports = SectionActionCreators;
