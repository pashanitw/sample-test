var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var EditorStore = require('./EditorStore.js');
var React = require('react/addons');
var update = React.addons.update;
var EditorActionCreator = require('../actions/EditorActionCreator.js');

// data storage
var _currentPage = {};

// add private functions to modify data
function addItem(title, completed = false) {
  _data.push({title, completed});
}
function updateComponentMarkup(index, html) {
  _currentPage = _currentPage.updateComponentMarkup(index, html);
  EditorStore.updateCurrentPage(_currentPage);
}

// Facebook style store creation.
var CanvasStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getState: function () {
    _currentPage = EditorStore.getState().pageCollection.getCurrentPage();
    return {
      currentPage: _currentPage
    };
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
      case Constants.ActionTypes.PAGE_SWITCHED:
        AppDispatcher.waitFor([EditorStore.dispatcherIndex]);
        CanvasStore.emitChange();
        break;
      case Constants.ActionTypes.ADD_TASK:
        var text = action.text.trim();
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addItem(text);
          CanvasStore.emitChange();
        }
        break;
      case Constants.ActionTypes.ADD_COMPONENT:
      case Constants.ActionTypes.UPDATE_COMPONENT_POSITION:
      case Constants.ActionTypes.MOVE_SELECTION_UP:
      case Constants.ActionTypes.MOVE_SELECTION_DOWN:
      case  Constants.ActionTypes.ADD_COMPONENT:
      case Constants.ActionTypes.ADD_GUTTER:
        AppDispatcher.waitFor([EditorStore.dispatcherIndex]);
        CanvasStore.emitChange();
        break;



      // add more cases for other actionTypes...
    }
  })

});

module.exports = CanvasStore;
