var React = require('react');
var Snapshot = require('./Snapshot.jsx');
var AddPageButton = require('./AddPageButton.jsx');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
require('react/addons');

var TreeView = React.createClass({

  getDefaultProps:function(){
    return {pages:[]};
  },
  propTypes:{
    pages:React.PropTypes.array.isRequired
  },
  componentWillMount: function () {
    console.log(this.props);
  },

  render: function () {
    var cx = React.addons.classSet;
    return (
        <div className="tree-view">
        {
          this.props.pages.map(function (page) {
            var classes = cx({
              'child': page.type=="page"
            });
            return <Snapshot page={page} onClick={EditorActionCreator.pageSwitched.bind(null,page)} className={classes}></Snapshot>
          })

          }

        </div>
    )
  },
  componentDidMount: function () {
    var slides = this.getDOMNode();
    $(slides).multisortable({
      items: "div.chapter-frame",
      placeholder: "slidePlaceholder",
      stop: this._dragStopped,
      mousedown: this._mousedown,
      click: this._clicked,
      axis: "y"
    });


  },
  _dragStopped: function () {
    console.log('dragging stopped');
  },
  _mousedown: function () {
    console.log("mousedown")
  },
  _clicked: function () {
    console.log('clicked')
  },
  componentWillUnmount: function () {
  },
  _onChange: function () {
  }
});


module.exports = TreeView;
