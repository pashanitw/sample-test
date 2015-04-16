var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var reactDnd = require('react-dnd');
var Resizable = require('react-resizable').Resizable;
var Draggable = require('react-draggable');
var update=React.addons.update;

const TextComponent = require('./TextComponent.jsx');
const ImageComponent = require('./ImageComponent.jsx');
const VideoComponent = require('./VideoComponent.jsx');
const TableComponent = require('./TableComponent.jsx');
var assign = require('object-assign');
var _ = require("lodash");
var childStyle = {
  width: '100%',
  height: '100%'
};

var componentRegistry = function (props,that) {
  var component;
  switch (props.type) {
    case ComponentTypes.TEXT:
      component = <TextComponent {...props} childStyle={childStyle} isEditable={that.state.isEditable}></TextComponent>;
      break;
    case ComponentTypes.IMAGE:
      component = <ImageComponent {...props} childStyle={childStyle}></ImageComponent>;
      break;
    case ComponentTypes.VIDEO:
      component = <VideoComponent {...props} childStyle={childStyle}></VideoComponent>;
      break;
    case ComponentTypes.TABLE:
      component = <TableComponent {...props} childStyle={childStyle}></TableComponent>;
      break;
  }
  return component;
};


var Component = React.createClass({
  mixins: [MousetrapMixin, PureRenderMixin],
  statics: {
    mousetrapBindings: [
      {
        key: Constants.KEYBOARD.DEL,
        callback: 'removeComponent'
      }
    ]
  },
  removeComponent() {
    EditorActionCreator.removeComponent(this.props._id);
  },
  getInitialState: function () {
    const {width,height}=this.props.styles;
    return {
      isEditable:false,
      width:width,
      height:height
    };
  },

  componentDidMount: function () {
  },
  renderComponent() {
  },
  handleStart(evt) {
    if(this.state.isEditable){
  //    this.stopnprevent(evt);
      return;
    }
    //console.log("handle ")
  },
  handleDrag(evt) {
    if(this.state.isEditable){
    //  this.stopnprevent(evt);
      return;
    }
    //  console.log("handle ")
  },
  onResizeStart(evt){
    evt.stopPropagation();
    console.log("propagation called");
  },
  stopnprevent(evt){
    evt.stopPropagation();
    evt.preventDefault();
  },
  onResizeStop(){
    EditorActionCreator.updateComponentPosition(this.props.index, {
      width: this.state.width,
      height: this.state.height
    });
  },
  handleStop(evt, ui) {
    if(this.state.isEditable){
      this.stopnprevent(evt);
    }
    console.log("handle called");
    var that = this;
    _.debounce(function () {
      console.log("debiunce called");
      if(ui.position.left!=that.props.styles.left || ui.position.top!=that.props.styles.top){
        EditorActionCreator.updateComponentPosition(that.props.index, ui.position);
      }

    }, 300)();
  },
  onResize(event, {element, size}) {
    var {width, height} = size;
    var widthChanged = width !== this.state.width, heightChanged = height !== this.state.height;
    if (!widthChanged && !heightChanged) return;

/*
    if (this.props.lockAspectRatio) {
      [width, height] = this.preserveAspectRatio(width, height);
    }
*/
    var that = this;
    _.debounce(function () {
      console.log("debiunce called");

/*      EditorActionCreator.updateComponentPosition(that.props.index, {
        width: width,
        height: height
      });*/
    }, 300)();
    var newState=update(that.state,{
      $merge:{
        width: width,
        height: height
      }
    });
    that.setState(newState);

  },
  preventDefault(evt){
    evt.preventDefault();
  },
  focusElement(){

    this.setState({
      isEditable:true
    });
  },
  render: function () {
    const { left, top, width,height,backgroundImage} = this.props.styles;
    var styles = assign({}, {
      position: 'absolute',
      border: '1px dashed gray',
      padding: '0.5rem',
      width: getStyles(this.state.width),
      height: getStyles(this.state.height),
      overflow:"hidden",
      backgroundImage:backgroundImage
    });
    function getStyles(style, name) {
      style+='';
      if (style) {
        return (style.match(/(.*?)%$/) ? style : style + "px");
      }
      return '';

    }

    var handleSize=[20,20];
    return (
      this.props.behaviour=='fixed'?
        <div style={this.props.styles}
          dangerouslySetInnerHTML={{__html: this.props.markup}}>
        </div>:
      <Draggable
        zIndex={100}
        start={{x: left, y: top}}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        grid={[20, 20]}>
        <Resizable
          handleSize={handleSize}
          width={this.state.width}
          height={this.state.height}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          onResizeStart={this.onResizeStart}
        >
          <div style={styles} onDoubleClick={this.focusElement}>
          {componentRegistry(this.props,this)}
          </div>
        </Resizable>


      </Draggable>

    );
  }
});

module.exports = Component;
