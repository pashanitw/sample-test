var React = require('react');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var AddTextButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.addComponent}>
        <i className="mdi-editor-format-color-text"></i>
      </a>
    );
  },
  addComponent(){
    EditorActionCreator.addComponent();
  }
});

module.exports = AddTextButton;
