var React = require('react');
var ComponentContainer = require('./ComponentContainer.jsx');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');
var Components;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var Constants = require('../constants/AppConstants');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var EditorStore=require('../stores/EditorStore.js');
var ComponentModel=require('../models/Component.js');
function makeDropTarget(context) {
  return {
    acceptDrop(component, item) {
      const delta = context.getCurrentOffsetDelta();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      component.moveBox(item.id, left, top);
      console.log("may be it cones here");
    }
  };
}

var reactDnd=require('react-dnd');
var CanvasEditor = React.createClass({
  mixins: [FluxibleMixin,reactDnd.DragDropMixin],
  statics: {
    storeListeners: [EditorStore],
    configureDragDrop(register, context) {
      register("Component", {
        dropTarget: makeDropTarget(context)
      });
    }
  },
  moveBox(id, left, top) {
    var selectedPage=this.state.pageCollection.getSelectedPage();
    var components=selectedPage.components;
    components.some(function(item,index){
      if(item._id==id){
        item.styles.left=left;
        item.styles.top=top;
        components.splice(index,1);
      var comp=new ComponentModel(item);
        components.push(comp);
        EditorStore.emitChange();
        return true;
      }
    });
  },
  getInitialState: function () {
    return EditorStore.getState();
  },
  updateHtml: function (component, html) {
    component.markup = $(html.target).html();
    EditorStore.emitChange();
  },
  onChange() {
    this.setState(EditorStore.getState());
  },
  _renderComponents(selectedPage) {
    var that = this;
    var components = [];
    if (selectedPage) {
      components = selectedPage.components.map(function (component) {
        return (
            <Component key={component._id} {...component}
                       id={component._id}
                       left={component.styles.left}
                       top={component.styles.top}
                      ></Component>

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
      <div className="editor-view"{...this.dropTargetFor("Component")}>
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

const dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: reactDnd.DropEffects.MOVE,
      item: component.props
    };
  },
  endDrag(component,ui){
    console.log(component,ui);
  }
};

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

var Component = React.createClass({
  mixins: [MousetrapMixin,reactDnd.DragDropMixin],
  statics: {
    mousetrapBindings: [
      {
        key: Constants.KEYBOARD.DEL,
        callback: 'removeComponent'
      }
    ],
    configureDragDrop(register) {
      register("Component", { dragSource });
    }
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
    const styles = {
      position: 'absolute',
      border: '1px dashed gray',
      padding: '0.5rem'
    };
    var props = this.props;
    var that = this;
    var style={
      position: 'absolute',
      border: '1px dashed gray',
      padding: '0.5rem',
      width:props.styles.width,
      height:props.styles.height,
      left:props.styles.left,
      top:props.styles.top

    };
    return (
      <div
      {...this.dragSourceFor("Component")}
        contentEditable="true"
        dangerouslySetInnerHTML={{__html: props.markup}}
        className={"component"}
        onClick={this.disable}
        onDrag={this.enable} style={style}
        onMouseDown={this.mousedown}>

      </div>
    )
  },
  mousedown(){
    console.log("onMousedown");
    var element=this.getDOMNode();
    $(element).focus();
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
/*
    $(element).draggable({disabled: false});*/

  },
  componentDidUpdate(){/*
    var element = this.getDOMNode();
    $(element).resizable({});*/
  }

});
var Wrapper = React.createClass({
  onClick(evt){
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
    var element = this.getDOMNode();
    $(element).resizable({});

  }

});
module.exports = CanvasEditor;
