var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var labels=Constants.Labels;
// data storage
var _data = [];

// add private functions to modify data
function addItem(title, completed = false) {

}
function loadTemplates() {

}
var _modalData = {
  header:labels.modalHeader,
  isModalOpen:false,
  files:[]
};

// Facebook style store creation.
var FileStore = assign({}, EventEmitter.prototype, {

  getState(){

    return {
     data:_modalData
    }
  },
  openModal:function(){
    _modalData.isModalOpen=true;
    this.emitChange();
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
    }
  })

});

module.exports = FileStore;
