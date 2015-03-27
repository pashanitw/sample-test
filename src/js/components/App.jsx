var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var TaskList = require('./TaskList.jsx');
var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;
var TreeView = require('./TreeView.jsx');
var EditorView = require("./EditorView.jsx")
var Navbar = require("./Navbar.jsx");
var MaterialModal = require("./MaterialModal.jsx")
var $ = require('jquery');
require('jquery-ui');
require('multisortable');
require('jquery-ui-draggable');
require('jquery-ui-droppable');
require('jquery-ui-resizable');
var PageModel = require('../models/PageModel.js');
var _=require('lodash');
var EditorStore=require("../stores/EditorStore.js");
var EditorStore = require('../stores/EditorStore.js');
var ModalStore=require('../stores/ModalStore.js');


var App = React.createClass({

  onChange: function () {

  },

  componentDidMount: function () {
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

  openModal: function () {
ModalStore.openModal();
  },
  render: function () {
    return (
      <div className="app-container">
        <button onClick={this.openModal}>click</button>
        <MaterialModal></MaterialModal>
        <Navbar/>
        <EditorView/>
      </div>
    )
  }

});

module.exports = App;

