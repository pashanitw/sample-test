var React=require('react/addons');
var update=React.addons.update;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');
var PageModel = require('../models/PageModel.js');
var PageCollection = require('../models/PageCollection.js');
var ComponentModel = require('../models/Component.js');
var utils = require('../utils/utils.js');
var cacheRegistry=require('../service/cacheRegistry.js');

// data storage
var _data = [];
function getSampleData() {
  /*  $.getJSON('templates/modern/js/Chapter.json',function(data){
   _data=data.components;
   EditorStore.emitChange();
   })*/
}
var editorModel = {
  currentTemplate: '',
  pages: [],
  selectedPage: null
};
getSampleData();
var _pageCollection = new PageCollection();

// add private functions to modify data
function addItem(title, completed = false) {
  _data.push({title, completed});
}
function addPage(template) {
  _pageCollection = _pageCollection.addPage(template);
}
function loadCss(template){
  if(template.registry.css){
    var id=utils.getUniqueId();
    $.get(template.registry.css).then(function(css){
      var style = '<style type="text/css" id="'+id+'">' + css + "</style>";
      $("head").append(style);
      cacheRegistry.registerComponent(id,Constants.MimeTypes.CSS)

    })
  }
}
function changeTemplateSelection(template) {
  cacheRegistry.clearCache();
  loadCss(template);
  _pageCollection = new PageCollection(template);
}
function switchPage(page) {
  _pageCollection = _pageCollection.switch(page);

}
function addComponent(type, data) {
  _pageCollection = _pageCollection.addComponent(type, data);
}

function removeComponent(id) {
  _pageCollection.removeComponent(id);
}

function removePage(id) {
  _pageCollection.removePage(id);
}

function moveSelectionUp(index) {
  if (index > 0) {
    moveSelection(--index);
  }
}
function moveSelectionDown(index) {
  if (index < (_pageCollection.getLength() - 1)) {
    moveSelection(++index);
  }
}

function moveSelection(index) {
  _pageCollection = _pageCollection.changeSelection(index);
}

function reArrangePages(location) {
  _pageCollection.reArrangePages(location);
}

function updateComponentPosition(id, position) {
  _pageCollection = _pageCollection.updateComponentPosition(id, position);
}
function updateComponentMarkup(index, html) {
  _pageCollection = _pageCollection.updateComponentMarkup(index, html);
}

function updatePages(pages) {
  _pageCollection = _pageCollection.updatePages(pages);
}
function addGutter(pages) {
  _pageCollection = _pageCollection.addGutter();
}

function updateTableCell(props){
  _pageCollection=_pageCollection.updateTableCell(props);
}


function updateState(){
  state={
    pageCollection: _pageCollection
  }
}
function handleGutter(value){
  _pageCollection=_pageCollection.handleGutter(value);
}
var state;
// Facebook style store creation.
var EditorStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function () {
    return editorModel;
  },
  getState: function () {
    updateState();
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
  updateCurrentPage: function (page) {
    _pageCollection.updateCurrentPage(page);
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
          EditorStore.emitChange();
        }
        break;
      case Constants.ActionTypes.ADD_PAGE:
        var template = action.template;
        if (template) {
          addPage(template);
          EditorStore.emitChange();
        }
        break;
      case Constants.ActionTypes.TEMPLATE_SELECTED:
        var template = action.template;
        changeTemplateSelection(template);
        EditorStore.emitChange()
        break;
      case Constants.ActionTypes.PAGE_SWITCHED:
        var page = action.page;
        switchPage(page);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.ADD_COMPONENT:
        var type = action.componentType;
        var data = action.data;
        addComponent(type, data);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.REMOVE_COMPONENT:
        var id = action.id;
        removeComponent(id);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.REMOVE_PAGE:
        var id = action.id;
        removePage(id);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.MOVE_SELECTION_UP:
        var index = action.index;
        moveSelectionUp(index);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.MOVE_SELECTION_DOWN:
        var index = action.index;
        moveSelectionDown(index);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.RE_ARRANGE_PAGES:
        var location = action.locationOb;
        reArrangePages(location);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.UPDATE_COMPONENT_MARKUP:
        var data = action.data;
        updateComponentMarkup(data.index, data.html);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.UPDATE_COMPONENT_POSITION:
        var position = action.position;
        var index = action.index;
        updateComponentPosition(index, position)
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.UPDATE_PAGES:
        var pages = action.pages;
        updatePages(pages);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.ADD_GUTTER:
        addGutter();
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.UPDATE_TABLE_CELL:
        updateTableCell(action);
        EditorStore.emitChange();
        break;
      case Constants.ActionTypes.HANDLE_GUTTER:
        handleGutter(action.value);
        EditorStore.emitChange();
        break;

    }
  })

});

module.exports = EditorStore;
