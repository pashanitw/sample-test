var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var assign = require('object-assign');
var CanvasStore = require('../stores/CanvasStore.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var Constants = require('../constants/AppConstants');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var ComponentModel = require('../models/Component.js');
var Component = require('./Component.jsx');
var mui = require('material-ui');
var Paper=mui.Paper;


var reactDnd = require('react-dnd');
var CanvasEditor = React.createClass({
  mixins: [FluxibleMixin, PureRenderMixin],
  getInitialState: function () {
    return CanvasStore.getState();
  },
  statics: {
    storeListeners: [CanvasStore]
  },
  moveItem(id, left, top) {
    var selectedPage = this.state.currentPage;
    var components = selectedPage.components;
    components.some(function (item, index) {
      if (item._id == id) {
        item.styles.left = left;
        item.styles.top = top;
        components.splice(index, 1);
        var comp = new ComponentModel(item);
        components.push(comp);
        CanvasStore.emitChange();
        return true;
      }
    });
  },
  updateHtml: function (component, html) {
    component.markup = $(html.target).html();
    CanvasStore.emitChange();
  },
  onChange() {
    this.setState(CanvasStore.getState());
  },
  _renderComponents(selectedPage) {
    var that = this;
    var components = [];
    if (selectedPage) {
      components = selectedPage.components.map(function (component, index) {
        return (
          <Component key={component._id} {...component}
            index={index}
            id={component._id}>
          </Component>
        )

      })
    }
    return components;
  },
  render: function (component) {
    var that = this,
      selectedPage = this.state.currentPage,
      components = [];
    return (
      <div className="editor-container">
        <Paper zDepth={5}>
          <div className="editor-view gradient-pattern">
      {
        this._renderComponents(selectedPage)

        }
          </div>
        </Paper>

      </div>
    )
  },

  componentDidMount: function () {

  },
  updateElement(evt) {
    debugger;
    //  evt.editor.updateElement();
  },
  componentDidUpdate() {

  },
  _configureCk() {
  },
  _destroyCk() {
    for (var name in CKEDITOR.instances) {
      CKEDITOR.instances[name].destroy()
    }
  }
});

const dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: reactDnd.DropEffects.MOVE,
      item: component.props
    };
  },
  endDrag(component, ui) {
    console.log(component, ui);
  }
};

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

var Wrapper = React.createClass({
  onClick(evt) {
    evt.preventDefault();
  },
  render() {
    return (
      <div style={this.props.styles} onclick={this.onClick}>
      {this.props.children}
      </div>
    )
  },
  componentDidMount() {

  }

});
module.exports = CanvasEditor;
