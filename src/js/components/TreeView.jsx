var React = require('react'),
   $=require('jquery');

var TreeView= React.createClass({

  componentWillMount:function(){
  },
  render: function () {
    return (
      <div className="tree-view">

      </div>
    )
  },
  componentDidMount:function(){
    var slides=this.getDOMNode();
    debugger;
    /* slides.multisortable({
     items: "div.card-panel",
     placeholder: "slidePlaceholder",
     stop: this._dragStopped.bind(this),
     mousedown: this._mousedown.bind(this),
     click: this._clicked.bind(this),
     axis: 'y'
     });
     slides.prepend()*/

  },
  _dragStopped:function(){
    console.log('dragging stopped');
  },
  _mouseDown:function(){
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
