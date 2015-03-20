var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var TreeView = require('./TreeView.jsx');
var EditorStore=require('../stores/EditorStore.js');

var EditorView = React.createClass({
  propTypes:{
    pages:React.PropTypes.array.isRequired,
    selectedPage:React.PropTypes.object.isRequired
  },
  getDefaultProps(){
  return {
    selectedPage:{
      components:[]
    }
  }
  },
  componentWillMount:function(){
   // EditorStore.addChangeListener(this._onChange)
  },
  render: function () {
console.log("selected components",this.props.selectedPage.components);
    return (
      <div className="editor-area">
        <TreeView pages={this.props.pages}></TreeView>
        <CanvasEditor components={this.props.selectedPage.components}></CanvasEditor>

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
