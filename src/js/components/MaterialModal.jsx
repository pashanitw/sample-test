var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
let TemplateList = require("./TemplateList.jsx");
let ModalStore = require('../stores/ModalStore.js');
let FluxibleMixin=require('../mixins/FliuxibleMixin.js');
let propTypes = React.PropTypes;
let MaterialModal = React.createClass({
  mixins:[FluxibleMixin,PureRenderMixin],

  statics: {
    storeListeners: [ModalStore]
  },
  getInitialState() {
    ModalStore.getTemplates();
  return this.getStore(ModalStore).getState();
  },
  componentWillMount() {

  },
  render() {
    return (
      <div  className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.state.modalHeader}</h4>
          <TemplateList templates={this.state.templates} onSelect={this.doneSelection}/>
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close" onClick={this._closeModal}>Agree</a>
        </div>
      </div>
    );
  },
  doneSelection: function () {
    var node = this.getDOMNode();
    $(node).closeModal();
    this._closeModal();

  },
  componentDidMount() {
  },
  componentWillUpdate(nextProps,nextState) {
    if (this.state.isOpen !== nextState.isOpen) {
      if (nextState.isOpen) {
        var node = this.getDOMNode();
        $(node).openModal({
          complete: function () {
            ModalStore.closeModal();
          }
        });
      } else {
        var node = this.getDOMNode();
        $(node).closeModal();
        ModalStore.closeModal();
      }
    }
  },
  componentWillUnMount() {
  },
  onChange() {
    this.setState(this.getStore(ModalStore).getState());
  },
  _closeModal: function () {
    ModalStore.closeModal();
  }
});

module.exports = MaterialModal;
