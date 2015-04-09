var React = require('react');
var ComponentContainer = require('./ComponentContainer.jsx');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');
var Components;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var Constants = require('../constants/AppConstants');
var EditorActionCreator = require('../actions/EditorActionCreator.js');

var CanvasEditor = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [EditorStore]
  },
  getInitialState: function () {
    return EditorStore.getState();
  },
  updateHtml: function (component, html) {
    component.markup = $(html.target).html();
    EditorStore.emitChange();
  },
  onChange() {
    this.setState(this.getStore(EditorStore).getState());
  },
  _renderComponents(selectedPage) {
    var that = this;
    var components = [];
    if (selectedPage) {
      components = selectedPage.components.map(function (component) {
        return (
          <Wrapper styles={component.styles}>
            <Component key={component._id} {...component}></Component>
          </Wrapper>
        )

      })
    }
    return components;
  },
  render: function (component) {
    var that = this,
      pageCollection = this.state.pageCollection,
      selectedPage = pageCollection.getSelectedPage(),
      components = [];
    return (
      <div className="editor-view">
      {
        this._renderComponents(selectedPage)

        }
      </div>
    )
  },

  componentDidMount: function () {
    $("body").droppable();

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


var Component = React.createClass({
  mixins: [MousetrapMixin],
  statics: {
    mousetrapBindings: [
      {
        key: Constants.KEYBOARD.DEL,
        callback: 'removeComponent'
      }
    ]
  },
  getDefaultProps() {
    return {}
  },
  componentWillMount() {
  },
  removeComponent() {
    alert("remove component called");
    EditorActionCreator.removeComponent(this.props._id);
  },
  render() {
    var props = this.props;
    var that = this;
    var style={
      border:"1px solid black"
    }
    return (
      <div contentEditable="true"
        dangerouslySetInnerHTML={{__html: props.markup}}
        className={"component"}
        onClick={this.disable}
        onDrag={this.enable}>

      </div>
    )
  },
  enable() {
    var element = this.getDOMNode();
    $(element).draggable({disabled: false});
  },
  disable() {
    var element = this.getDOMNode();
    $(element).draggable({disabled: true});
    element.focus();
  },
  componentDidMount() {
    var element = this.getDOMNode();
    CKEDITOR.inline(element);
    $(element).draggable({
      containment: "parent"
    });
    $(element).resizable({});
    $(element).draggable({disabled: false});

  }

})
var Wrapper = React.createClass({

  render() {
    return (
      <div style={this.props.styles}>
      {this.props.children}
      </div>
    )
  },
  componentDidMount() {
    var element = this.getDOMNode();
    $(element).resizable({});
    $(element).draggable({disabled: false});

  }

})
module.exports = CanvasEditor;
