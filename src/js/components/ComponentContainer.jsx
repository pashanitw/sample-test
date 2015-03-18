const React = require('react');

let ComponentContainer = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    var divStyle={
      width:200,
      height:200
    };

    return (
      <div contentEditable="true" className="component ui-selected" style={this.props.style}>
      {this.props.children}
      </div>
    );
  }
});

module.exports = ComponentContainer;
