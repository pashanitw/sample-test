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
    var pages=[];
  for(var i=0;i<DataStore.getAll().templates.length;i++){
     var item=DataStore.getAll().templates[i];
     var page=new PageModel();
     page.components=item[0].cover.components;
     pages.push(page);
   }
    this.setState({
      modal: {
        isOpen: true,
        templates: pages,
        modalHeader: "Select the template"
      }
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
    /*    var parsedData=jsonData;
     var item1=new PageModel();
     item1.components=parsedData.components;
     var item2=new PageModel();
     item2.components=parsedData.components;
     this.setState({modal:{isOpen:true,templates:[item1,item2]}})*/
  },
  render: function () {
    return (
      <div className="app-container">
        <button onClick={this.updateState}>click</button>
        <MaterialModal {...this.state.modal}></MaterialModal>
      </div>
    )
  }

});

module.exports = App;

var jsonData = {
  "components": [
    {
      "_id": "0",
      "type": "text",
      "styles": {
        "width": 430,
        "height": 200,
        "left": 600,
        "top": 88
      },
      "markup": "<h1>This is chapter Json</h2>"
    },

    {
      "_id": "0",
      "type": "text",
      "styles": {
        "width": 430,
        "height": 200,
        "left": 600,
        "top": 285
      },
      "markup": "<h1>This is chapter something</h2>"
    },
    {
      "_id": "0",
      "type": "text",
      "styles": {
        "width": 500,
        "height": 200,
        "left": 10,
        "top": 200
      },
      "markup": "<h1>This is chapter Json</h2>"
    },
    {
      "_id": "0",
      "type": "text",
      "styles": {
        "width": 500,
        "height": 200,
        "left": 10,
        "top": 20
      },
      "markup": "<h1>Amazing Space Secrets</h2>"
    }
  ]
}
