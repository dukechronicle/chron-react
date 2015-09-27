const store = require('../store');
const tabCursor = store.select('views', 'tab');

const NavigationActionCreators = {
  selectSection: (name) => {
    tabCursor.set(name);
  },
};

module.exports = NavigationActionCreators;
