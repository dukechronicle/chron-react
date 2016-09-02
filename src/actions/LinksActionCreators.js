const store = require('../store');
const linksCursor = store.select('models', 'links');

const LinksActionCreators = {
  getLinks: () => {
    const links = [
      ['http://dukechroniclealumni.com/', 'Alumni'],
      ['http://dukechronicle.campusave.com/', 'Classifieds'],
      ['http://nearduke.com/dining', 'Dining'],
      ['http://nearduke.com/housing', 'Housing'],
    ].map(([url, name]) => { return {url, name}; });
    linksCursor.set(links);
  },
};

module.exports = LinksActionCreators;
