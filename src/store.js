var Baobab = require('baobab');

var tree = new Baobab({
  models: {
    posts: {}, // Map of post ids to post content
    sectionIds: {}, // Map of section name to list of post ids
  },
  views: {
    tab: 'frontpage',
  },
});

module.exports = tree;
