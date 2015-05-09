var React = require('react');

var RadioButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <p onTouchTap={this.onSelect}>
        <input name={this.props.name}
          type="radio"
          checked={this.props.id==this.props.selectedId}/>
        <label for="test1">{this.props.label}</label>
      </p>
    );
  },
  onSelect(){
    if(this.props.action){
      this.props.action(this.props.id);
    }
  }

});

module.exports = RadioButton;
