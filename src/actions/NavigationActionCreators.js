var store = require('../store');
var tabCursor = store.select('views', 'tab');

var NavigationActionCreators = {
  selectSection: (name) => {
    tabCursor.set(name);
  }
};

module.exports = NavigationActionCreators;
