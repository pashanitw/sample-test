var React = require('react');

var AddPage = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <a className="btn-floating btn-large waves-effect waves-light green"><i className="mdi-content-add"></i></a>
    );
  }
});

module.exports = AddPage;
