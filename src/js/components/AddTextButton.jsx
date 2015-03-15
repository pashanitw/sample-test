var React = require('react');

var AddTextButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.addPage}>
        <i className="mdi-editor-format-color-text"></i>
      </a>
    );
  }
});

module.exports = AddTextButton;
