var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

class NavigationActions {
  constructor() {
    this.generateActions('selectSection');
  }
}

module.exports = {
  selectSection: (name) => {
    Dispatcher.dispatch({
      type: ActionTypes.SELECT_SECTION,
      name: name,
    })
  }
};
