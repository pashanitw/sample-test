var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var React=require('react/addons');
var update=React.addons.update;

var labels=Constants.Labels;
// data storage
var _data = [];

// add private functions to modify data
function addItem(title, completed = false) {
  _data.push({title, completed});
}
var _modalData = {
  header:labels.modalHeader,
  isOpen:false
};

// Facebook style store creation.
var GeneralModalStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return _modalData;
  },
  getState(){
    return _modalData;
  },
  openModal:function(){
    _modalData=update(_modalData,{
      isOpen:{$set:true}
    });
    this.emitChange();
  },
  closeModal:function(){
    _modalData=update(_modalData,{
      isOpen:{$set:false}
    });
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
  })

});

module.exports = GeneralModalStore;
