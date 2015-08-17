var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var NavigationActionCreators = require('../actions/NavigationActionCreators');

var CHANGE_EVENT = 'change';

var state = {
  currentTab: 'frontpage',
};

var NavigationStore = assign({}, EventEmitter.prototype, {
  getTab: () => {
    return state.currentTab;
  },

  emitChange: () => {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

Dispatcher.register((action) => {
  switch(action.type) {
    case Constants.SELECT_SECTION:
      state.currentTab = action.name;
      NavigationStore.emitChange()
      break;

    default:
  }
});

module.exports = NavigationStore;
