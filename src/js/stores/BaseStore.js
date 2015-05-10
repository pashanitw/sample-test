var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var React=require("react/addons");
var {update}=React.addons;

// Facebook style store creation.
var state = {
  data: ''
};
function updateCategories(categories) {
  state.categories = categories;
}
function updateState(newState) {
  state = newState;
}
var BaseStore = assign({}, EventEmitter.prototype, {

  getState() {
    return state;
  },
  // Allow Controller-View to register itself with store
  addChangeListener: function (callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function () {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
      case Constants.ActionTypes.TRANSITION:
            var response=action.response;
        state=update(state,{
          data:{$set:response}
        });
        BaseStore.emitChange();
         break;
    }
  })

});

module.exports = BaseStore;
