var React = require('react');

var AddShapesButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.addPage}>
        <i className="mdi-action-view-module"></i>
      </a>
    );
  }
});

module.exports = AddShapesButton;
