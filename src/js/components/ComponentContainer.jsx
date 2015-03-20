const React = require('react');
var EditorStore=require('../stores/EditorStore');

let ComponentContainer = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },
  emitChange(){
   var  html = this.getDOMNode().innerHTML;
   var updated= $(html).html();
    if(this.props.onChange){
      this.props.onChange({
        target:updated
      });
    }

  },
  render() {
    var divStyle={
      width:200,
      height:200
    };

    return (
      <div contentEditable="true" className="component ui-selected" style={this.props.style} onInput={this.emitChange} >
      {this.props.children}
      </div>
    );
  }
});

module.exports = ComponentContainer;
