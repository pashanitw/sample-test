var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var TaskList = require('./TaskList.jsx');
var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;
var TreeView=require('./TreeView.jsx');
var EditorView=require("./EditorView.jsx")
var Navbar=require("./Navbar.jsx");
var MaterialModal=require("./MaterialModal.jsx")
var $ = require('jquery');
require('jquery-ui');
require('multisortable');
require('jquery-ui-draggable');
require('jquery-ui-droppable');
require('jquery-ui-resizable');
require('materialize');



var App = React.createClass({

  getInitialState: function() {
    var data = DataStore.getAll();
    return {
      tasks: [],
      modal:{
        isOpen:true
      }
    }
  },
  componentWillMount:function(){
    //JSTContext();
  },
  _onChange: function() {
    this.setState(DataStore.getAll());
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {

    DataStore.removeChangeListener(this._onChange);
  },

  handleAddNewClick: function(e) {
    var title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClearListClick: function(e) {
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
  updateState:function(){
    alert("in update state");
  },
  render:function(){
    return (
      <div className="app-container">
        <button onclick={this.updateState}>click</button>
        <MaterialModal isOpen={this.state.modal.isOpen}></MaterialModal>
      </div>
    )
  }

});

module.exports = App;
