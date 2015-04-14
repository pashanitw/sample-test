var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CanvasEditor = require('./CanvasEditor.jsx');
var TreeView = require('./TreeView.jsx');
var EditorStore=require('../stores/EditorStore.js');
var FileImportModal=require('./FileImportModal.jsx');

var EditorView = React.createClass({
  mixins:[PureRenderMixin],
  render: function () {
    return (
      <div className="editor-area clearfix">
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
