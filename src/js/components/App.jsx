var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;
var TreeView = require('./TreeView.jsx');
var EditorView = require("./EditorView.jsx")
var Navbar = require("./Navbar.jsx");
var MaterialModal = require("./MaterialModal.jsx")
var $ = require('jquery');
require('jquery-ui');
require('jquery-ui-draggable');
require('jquery-ui-droppable');
require('jquery-ui-resizable');
var PageModel = require('../models/PageModel.js');
var _=require('lodash');
var EditorStore=require("../stores/EditorStore.js");
var ModalStore=require('../stores/ModalStore.js');
var FileImportStore=require('../stores/FileImportStore.js');
var mui = require('material-ui');
var FileImportModal=require('./FileImportModal.jsx');

var App = React.createClass({
  mixins:[PureRenderMixin],
  onChange: function () {

  },

  componentDidMount: function () {
    CKEDITOR.on('configLoaded', function (event) {
      var editor=event.editor;
      alert(editor.config)
  })
  },

  componentWillUnmount: function () {
    DataStore.removeChangeListener(this._onChange);
  },
  _updateEditorView(data){
    console.log("in updating editor view");
    debugger;
    this.setState({
      editorView:EditorStore.getAll()
    });
  },

  handleAddNewClick: function (e) {
    var title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClearListClick: function (e) {
    ActionCreator.clearList();
  },

  render: function () {
    return (
      <div className="app-container">
        <FileImportModal></FileImportModal>
        <MaterialModal></MaterialModal>
        <Navbar/>
        <EditorView/>
      </div>
    )
  }

});

module.exports = App;

