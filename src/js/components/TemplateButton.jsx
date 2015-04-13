var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var ModalStore=require('../stores/ModalStore.js');

var TemplateButton = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },
  openModal(){
    ModalStore.openModal();
  },
  render: function() {
    return (
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
        onClick={this.openModal}>
        <i className="mdi-action-view-module"></i>
      </a>
    );
  }
});

module.exports = TemplateButton;
