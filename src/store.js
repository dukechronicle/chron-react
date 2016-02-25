const Baobab = require('baobab');

const tree = new Baobab({
  models: {
    /**
     * Map of post ids (int) to post content (object). Contents of the post
     * object can be found in postPropTypes.
     */
    posts: {},
    /**
     * Map of section name to list of post ids.
     */
    sectionIds: {},
    /**
     * List of top level sections.
     */
    topLevelSections: [],
    /**
     * List of external Chronicle links.
     */
    links: [],
    /**
    *Map of section name to page number
    */
    pages: {},
  },
  views: {
    tab: 'frontpage',
  },
});

module.exports = tree;
