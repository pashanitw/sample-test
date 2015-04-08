var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var CanvasBar = require('../../handlebars/CanvasEditor.bars');
var HandleBars = require('Handlebars');
var VirtualSnap=require('./VirtualSnap.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var Constants = require('../constants/AppConstants');
var cx = React.addons.classSet;
var styles = {
  transform: "scale(0.12,0.15)",
  transformOrigin: "0% 0%"
};
var Snapshot = React.createClass({
  mixins: [MousetrapMixin],
  statics: {
    mousetrapBindings: [
      {
        key: Constants.KEYBOARD.DEL,
        callback: 'removePage',
        ref:'trap'
      }
    ]
  },
  removePage(){
    EditorActionCreator.removePage(this.props.page._id);
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
  handleClick(){
    if(this.props.clickSnap){
      this.props.clickSnap();
    }
  },
  render: function () {
    var snapStyle = {
      overflow: "hidden"
    };
    var trapStyle={
      position:'absolute',
      width:'100%',
      height:'100%',
      zIndex:1000,
      top:0,
      content:'\'\'',
      opacity:0
    };
    var classes = cx({
      'chapter-frame':true,
      'selected': this.props.page.selected
    });

    return (


        <div className={classes} onClick={this.handleClick}>
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
