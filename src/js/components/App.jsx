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
/*require('materialize');*/


var App = React.createClass({
  getInitialState: function () {
    var data = DataStore.getAll();
    return {
      tasks: [],
      modal: {
        modalHeader: "Select the template",
        isOpen: false,
        templates: []
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
    this.setState({
      modal: {
        isOpen: true,
        templates:  [test[1][0],test[0][0]],
        modalHeader: "Select the template"
      },
      pages:[test[1][0].cover]
    });
  },

  componentDidMount: function () {
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {

    DataStore.removeChangeListener(this._onChange);
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

  /*  render:function(){
   return (
   <div className="app-container">
   <Navbar/>
   <EditorView/>
   </div>
   )
   }*/
  updateState: function () {
    DataStore.getTemplates();
  },
  render: function () {
    return (
      <div className="app-container">
        <button onClick={this.updateState}>click</button>
        <MaterialModal {...this.state.modal}></MaterialModal>
        <Navbar/>
        <EditorView pages={this.state.pages}/>
      </div>
    )
  }

});

module.exports = App;

