var React = require('react');
var FileImportStore=require('../stores/FileImportStore.js');
var AddImageButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },
  openModal(){
    FileImportStore.openModal();
  },
  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.openModal}>
        <i className="mdi-action-view-module"></i>
      </a>
    );
  }
});

module.exports = AddImageButton;

