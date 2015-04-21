var React = require('react/addons');
var assign = require('object-assign');
var CanvasStore = require('../stores/CanvasStore.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var Constants = require('../constants/AppConstants');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var ComponentModel = require('../models/Component.js');
var Component = require('./Component.jsx');
var cx = React.addons.classSet;
var SwitchButton=require('./SwitchButton.jsx');
let GutterButton = React.createClass({
  mixins: [FluxibleMixin],
  getInitialState: function () {
    return CanvasStore.getState();
  },
  statics: {
    storeListeners: [CanvasStore]
  },
  componentDidMount() {
  },

  render() {
    return (
    this.state.currentPage?
      <SwitchButton model={this.state.currentPage.hasGutter}
        onChangeEvent={this.updateGutter}></SwitchButton>:
      null
    );
  },
  updateGutter(evt){
    EditorActionCreator.handleGutter(evt.target.checked);
  },
  onChange() {
    this.setState(CanvasStore.getState());
  }
});

module.exports = GutterButton;
