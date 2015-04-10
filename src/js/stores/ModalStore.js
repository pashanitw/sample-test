var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var labels=Constants.Labels;
// data storage
var _data = [];

// add private functions to modify data
function addItem(title, completed = false) {
  _data.push({title, completed});
}
function loadTemplates() {
  var deferred = $.Deferred();
  $.when($.getJSON("config.json")).done(function (data) {
    var promises = [];
    data.templates.forEach(function (template) {
      var def = $.Deferred();
      promises.push(def.promise());
      $.getJSON(template.config).then(function(config){
        $.getJSON(template.template).then(function(template){
          template.config=config;
          def.resolve(template);
        });
      });
    });
    $.when(...promises).done(function () {
      var templates=[]
      for(var i=0,length=arguments.length;i<length;i++){
        templates.push(arguments[i]);
      }
      deferred.resolve(templates);
    })
  });
  return deferred.promise();
}
var _modalData = {
  header:labels.modalHeader,
  isOpen:false,
  templates:[]}

// Facebook style store creation.
var ModalStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return _modalData;
  },
  getState(){
          return _modalData;
  },
  getTemplates() {
    var that = this;
    loadTemplates().done(function (templates) {
      _modalData.templates = templates;
      that.emitChange();
    })
  },
  openModal:function(){
    _modalData.isOpen=true;
    this.emitChange();
  },
  closeModal:function(){
    _modalData.isOpen=false;
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
      case Constants.ActionTypes.ADD_TASK:
        var text = action.text.trim();
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addItem(text);
          DataStore.emitChange();
        }
        break
    }
  })

});

module.exports = ModalStore;
