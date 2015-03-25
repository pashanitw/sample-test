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
var EditorStore=require("../stores/EditorStore.js")


var App = React.createClass({
  getInitialState: function () {
    var data = DataStore.getAll();
    return {
      tasks: [],
      modal: {
        modalHeader: "Select the template",
        isOpen: false,
        templates: []
      },
      editorView:{
        pages:[]
      }
    }
  },
  componentWillMount: function () {
    (this._onChange)
  },
  _onChange: function () {
    console.log("lodash is",_);
console.log("converted array",Array.prototype.slice.call(DataStore.getAll().templates))
    var test=Array.prototype.slice.call(DataStore.getAll().templates);
    console.log("test object is",test);
    this.setState({
      modal: {
        isOpen: true,
        templates:  [test[1][0],test[0][0]],
        modalHeader: "Select the template"
      }
    });
  },

  componentDidMount: function () {
    DataStore.addChangeListener(this._onChange);
    EditorStore.addChangeListener(this._updateEditorView)
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

  updateState: function () {
    DataStore.getTemplates();
  },
  render: function () {
    return (
      <div className="app-container">
        <button onClick={this.updateState}>click</button>
        <MaterialModal {...this.state.modal}></MaterialModal>
        <Navbar pages={this.state.editorView.pages}/>
        <EditorView pages={this.state.editorView.pages} selectedPage={this.state.editorView.selectedPage}/>
      </div>
    )
  }

});

module.exports = App;

