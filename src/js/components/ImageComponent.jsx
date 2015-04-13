var React = require('react');

var ImageComponent = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <img src={this.props.src} style={this.props.childStyle}
      onDrag={this.onDrag}
      onMouseDown={this.onMouseDown}/>
    );
  },
  onDrag(evt){
    evt.preventDefault();
  },
  onMouseDown(evt){
    evt.preventDefault();
  }
});

module.exports = ImageComponent;
