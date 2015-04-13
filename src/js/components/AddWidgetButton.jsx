var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var AddWidgetButton = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.addPage}>
        <i className="mdi-device-now-widgets"></i>
      </a>
    );
  }
});

module.exports = AddWidgetButton;
