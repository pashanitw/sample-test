var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var TreeView = require('./TreeView.jsx');
var EditorStore=require('../stores/EditorStore.js');

var EditorView = React.createClass({
  getInitialState: function () {
   return EditorStore.getAll();
  },
  componentWillMount:function(){
    EditorStore.addChangeListener(this._onChange)
  },
  render: function () {

    return (
      <div className="editor-area">
        <TreeView pages={this.state.pages}></TreeView>
        <CanvasEditor components={this.state.data}></CanvasEditor>
      </div>
    );
  },
  componentDidMount: function () {
  },
  _onChange:function(){
    this.setState(EditorStore.getAll());
  }
});

module.exports = EditorView;
