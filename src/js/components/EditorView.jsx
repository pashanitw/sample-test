var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var TreeView = require('./TreeView.jsx');
var EditorStore=require('../stores/EditorStore.js');

var EditorView = React.createClass({

  componentWillMount:function(){
   // EditorStore.addChangeListener(this._onChange)
  },
  render: function () {

    return (
      <div className="editor-area">
        <TreeView pages={this.props.pages}></TreeView>
      </div>
    );
  },
  componentDidMount: function () {
    return EditorStore.getAll();
  },
  _onChange:function(){
    console.log("came here")
//    this.setState(EditorStore.getAll());
  }
});

module.exports = EditorView;
