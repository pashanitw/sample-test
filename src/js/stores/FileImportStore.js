var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var labels=Constants.Labels;
var React=require('react/addons');
var update=React.addons.update;

var _modalData = {
  header:labels.modalHeader,
  isOpen:false,
  templates:[],
  url:'',
  file:''
}

// Facebook style store creation.
var FileImportStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll() {

    return _modalData;
  },
  getState(){
    return _modalData;
  },
  openModal:function(type){
    _modalData=update(_modalData,{
      isOpen:{$set:true},
      type:{$set:type}
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

    switch (action.type) {

    }
  })

});

module.exports = FileImportStore;
