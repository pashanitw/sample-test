var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var TreeView = require('./TreeView.jsx');
var EditorStore=require('../stores/EditorStore.js');

var EditorView = React.createClass({
  render: function () {
    return (
      <div className="editor-area">
        <TreeView/>
        <CanvasEditor/>
      </div>
    );
  },
  componentDidMount: function () {

  },
  onChange:function(){

  }
});

module.exports = EditorView;
