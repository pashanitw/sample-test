var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var PageModel = require('../models/PageModel.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Snapshot = require('./Snapshot.jsx')
require('react/addons');
var EditorSore = require('../stores/EditorStore.js');
var ModalSore = require('../stores/ModalStore.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var DropDownMenu=require('./DropDownMenu.jsx');
var cx = React.addons.classSet;
var ExportButton=require("./ExportButton.jsx");


var numberMenuItems = [
  { payload: '1', text: 'new' },
  { payload: '2', text: 'open'},
  { payload: '3', text: 'save' },
  { payload: '4', text: 'save as..' },
  { payload: '4', text: 'undo',number: 'ctrl+z' },
  { payload: '4', text: 'redo',number: 'ctrl+y' },
  { payload: '4', text: 'cut',number: 'ctrl+x' },
  { payload: '4', text: 'copy',number: 'ctrl+c' },
  { payload: '4', text: 'paste',number: 'ctrl+v' },
  { payload: '4', text: 'delete',number: 'Del' },
  { payload: '4', text: 'import' },
  { payload: '4', text: 'export' }
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
    var iconStyle={
      lineHeight: '34px'
    };
    var classes=cx({
      'mdi-hardware-keyboard-arrow-down':true,
      'right':true
    });
    var style = {
      display: 'inline-block',
      position: 'relative',
      color:'#000'
    };
    var that = this;

    return (
      <div style={style}>
        <DropDownMenu menuItems={numberMenuItems} onChange={this._onItemClick} >
          <a className="waves-effect waves-light btn">
            <i className={classes} style={iconStyle}></i>Nextbook</a>
        </DropDownMenu>
      </div>

    );
  },
  _onItemClick(e, key, menuItem){
   if(menuItem.payload==1){
     ModalSore.openModal();
     ExportButton.show();
   }
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
