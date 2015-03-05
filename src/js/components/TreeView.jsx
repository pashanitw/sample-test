var React = require('react'),
   $=require('jquery');
require('jquery-ui');
require('multisortable');
var Snapshot=require('./Snapshot.jsx');

var TreeView= React.createClass({

  componentWillMount:function(){
  },
  render: function () {
    return (
      <div className="tree-view">
        <Snapshot></Snapshot>
        <Snapshot></Snapshot>
        <Snapshot className="child"></Snapshot>
        <Snapshot className="child"></Snapshot>
        <Snapshot></Snapshot>
        <Snapshot></Snapshot>
        <Snapshot className="child"></Snapshot>
        <Snapshot className="child-of-child"></Snapshot>
        <Snapshot></Snapshot>
      </div>
    )
  },
  componentDidMount:function(){
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
  _dragStopped:function(){
    console.log('dragging stopped');
  },
  _mousedown:function(){
    console.log("mousedown")
  },
  _clicked:function(){
    console.log('clicked')
  },
  componentWillUnmount:function(){
  },
  _onChange: function () {
  }
});


module.exports = TreeView;
