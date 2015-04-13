var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CanvasEditor = require('./CanvasEditor.jsx');
var CanvasBar = require('../../handlebars/CanvasEditor.bars');
var HandleBars = require('Handlebars');
var VirtualSnap = require('./VirtualSnap.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var Constants = require('../constants/AppConstants');
var cx = React.addons.classSet;
var DragDropMixin = require('react-dnd').DragDropMixin;
var styles = {
  transform: "scale(0.12,0.15)",
  transformOrigin: "0% 0%"
};
const dragSource = {
  beginDrag(component) {
    return {
      item: {
        id: component.props.page._id
      }
    };
  },
  endDrag(component){

    var id= component.props.page._id;
    if(component.props.updatePages){
      component.props.updatePages(id);
    }
  }
};
const dropTarget = {
  over(component, item) {
    component.props.moveSnapshot(item.id, component.props.page._id);
  }
};

var Snapshot = React.createClass({
  mixins: [MousetrapMixin, PureRenderMixin, DragDropMixin],
  statics: {
    mousetrapBindings: [
      {
        key: Constants.KEYBOARD.DEL,
        callback: 'removePage',
        ref: 'trap'
      },
      {
        key: Constants.KEYBOARD.UP,
        callback: 'moveSelectionUp',
        ref: 'trap'
      },
      {
        key: Constants.KEYBOARD.DOWN,
        callback: 'moveSelectionDown',
        ref: 'trap'
      }
    ],
    configureDragDrop(register) {
      register("SNAPSHOT", {
        dragSource,
        dropTarget
      });
    }
  },
  removePage() {
    EditorActionCreator.removePage(this.props.page._id);
  },
  moveSelectionUp() {
    EditorActionCreator.moveSelectionUp(this.props.page.index);
    console.log("move selection up");
  },
  moveSelectionDown() {
    EditorActionCreator.moveSelectionDown(this.props.page.index)
  },
  getInitialState: function () {
    return {};
  },
  propTypes: {
    page: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      page: {
        components: []
      }
    }
  },
  handleClick() {
    if (this.props.clickSnap) {
      this.props.clickSnap();
    }
  },
  render: function () {
    var snapStyle = {
      overflow: "hidden"
    };
    var trapStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      top: 0,
      content: '\'\'',
      opacity: 0
    };
    var classes = cx({
      'chapter-frame': true,
      'selected': this.props.page.selected
    });
    const { text } = this.props;
    const { isDragging } = this.getDragState("SNAPSHOT");
    const opacity = isDragging ? 0 : 1;
    var parentStyles = {
      opacity: opacity
    }

    return (


      <div {...this.dragSourceFor("SNAPSHOT")}
          {...this.dropTargetFor("SNAPSHOT")}
        className={classes}
        style={parentStyles}
        onClick={this.handleClick}>
        <div ref="snap" className="snap-shot card-panel" style={snapStyle}>
          <VirtualSnap styles={styles} page={this.props.page}/>
        </div>
        <div ref="trap" contentEditable="true" style={trapStyle}></div>
      </div>
    );

  },
  componentDidMount: function () {
    this.selectNode();
  },
  selectNode() {
    if (this.props.page.selected) {
      var node = this.refs.trap.getDOMNode();
      $(node).focus();
    }
  },
  componentDidUpdate() {
    this.selectNode();
  },
  renderScreenShot(object) {

  },
  componentWillReceiveProps(nextProps) {

  }
});

module.exports = Snapshot;
