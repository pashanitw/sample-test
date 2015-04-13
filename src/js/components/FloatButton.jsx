var FileImportStore=require('../stores/FileImportStore.js');
var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Constants = require('../constants/AppConstants');
var ComponentTypes=Constants.ComponentTypes;
var cx = React.addons.classSet;
var FloatButton = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },
  doAction() {
    if (this.props.action) {
      this.props.action();
    }
  },
  render: function() {

    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.doAction}>
        <i className={this.props.classes}></i>
      </a>
    );
  }
});

module.exports = FloatButton;
