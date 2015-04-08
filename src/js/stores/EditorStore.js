var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var PageModel=require('../models/PageModel.js')
var PageCollection=require('../models/PageCollection.js');
var ComponentModel=require('../models/Component.js');
var $ = require('jquery');

// data storage
var _data = [];
function getSampleData(){
/*  $.getJSON('templates/modern/js/Chapter.json',function(data){
    _data=data.components;
    EditorStore.emitChange();
  })*/
}
var editorModel={
  currentTemplate:'',
  pages:[],
  selectedPage:null
};
getSampleData();
var _pageCollection=new PageCollection();

// add private functions to modify data
function addItem(title, completed=false) {
  _data.push({title, completed});
}
function addPage(template){
  _pageCollection.addPage(template);
}

function changeTemplateSelection(template){
  _pageCollection=new PageCollection(template);
  debugger;
}
function switchPage(page){
_pageCollection.switch(page);
}
function addComponent(){
  _pageCollection.addComponent();
}

function removeComponent(id){
  _pageCollection.removeComponent(id);
}

function removePage(id){
  _pageCollection.removePage(id);
}
// Facebook style store creation.
var EditorStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return editorModel;
  },
  getState:function(){
    return {
      pageCollection:_pageCollection
    }
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_TASK:
        var text = action.text.trim();
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addItem(text);
          EditorStore.emitChange();
        }
        break;
      case Constants.ActionTypes.ADD_PAGE:
           var template=action.template;
            if(template) {
              addPage(template);
              EditorStore.emitChange();
            }
            break;
      case Constants.ActionTypes.TEMPLATE_SELECTED:
            var template=action.template;
            changeTemplateSelection(template);
            EditorStore.emitChange()
            break;
      case Constants.ActionTypes.PAGE_SWITCHED:
            var page=action.page;
            switchPage(page);
            EditorStore.emitChange();
            break;
      case Constants.ActionTypes.ADD_COMPONENT:
            addComponent();
            EditorStore.emitChange();
            break;
      case Constants.ActionTypes.REMOVE_COMPONENT:
        var id=action.id;
            removeComponent(id);
            EditorStore.emitChange();
            break;
      case Constants.ActionTypes.REMOVE_PAGE:
        var id=action.id;
        removePage(id);
            EditorStore.emitChange();
    }
  })

});

module.exports = EditorStore;
