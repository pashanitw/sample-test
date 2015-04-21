var React=require('react/addons');
var Cx=React.addons.classSet;

let SwitchButton = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    return (
      <div className="switch gutter-switch">
        <label>
          <input  type="checkbox"
            checked={this.props.model?'checked':''}
            onChange={this.props.onChangeEvent}/>
          <span className="lever"></span>
        </label>
        <span>Gutter</span>
      </div>
    );
  }
});

module.exports = SwitchButton;
