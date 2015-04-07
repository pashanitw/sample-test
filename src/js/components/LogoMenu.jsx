var React = require('react');
var PageModel = require('../models/PageModel.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Snapshot = require('./Snapshot.jsx')
require('react/addons');
var EditorSore = require('../stores/EditorStore.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var mui = require('material-ui');
var Menu=mui.Menu;
var DropDownMenu=mui.DropDownMenu;

var numberMenuItems = [
  { payload: '1', text: 'All', number: 'F2' },
  { payload: '3', text: 'Uncategorized', number: 'F6'},
  { payload: '4', text: 'Trash', number: 'F12' }
];
var LogoMenu = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [EditorSore]
  },
  getInitialState: function () {
   return {

   }
  },
  render: function () {
    var style = {
      display: 'inline-block',
      position: 'relative',
      color:'#000'
    };
    var that = this;
    var cx = React.addons.classSet;
    return (
      <div style={style} className={"nextbook-logo"}>
        <a href="#" className="brand-logo">Nextbook</a>
        <DropDownMenu menuItems={numberMenuItems} onChange={this._onItemClick} />
      </div>

    );
  },
  _onItemClick(e, key, menuItem){
    console.log(menuItem);
  },
  togglePages:function(){
    var state=this.state;
    state.showPages=!state.showPages;
    this.setState(state);
  },
  componentDidMount: function () {

  },
  componentDidUpdate() {
  },
  onChange() {
    this.setState(EditorSore.getState());
  }
});

module.exports = LogoMenu;
