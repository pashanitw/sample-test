const React = require('react');
let FluxibleMixin = require('../mixins/FliuxibleMixin.js');
let propTypes = React.PropTypes;
let FileImportStore=require('../stores/FileImportStore.js');
let FileImportModal = React.createClass({


  statics: {
    storeListeners: [FileImportStore]
  },
  getInitialState() {

    return FileImportStore.getState();
  },
  render() {
    return (
      <div  className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.state.modalHeader}</h4>
          <div>
            <p>Browse</p>
            <input type="file"/>
          </div>
          <div>
            <p>Enter Url</p>
            <input type="text"/>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Import</a>
        </div>
      </div>
    );
  },
  componentWillMount(){
    FileImportStore.addChangeListener(this.onChange);
  },
  componentDidMount() {
  },
  componentWillUpdate(nextProps, nextState) {
    if (this.state.isOpen !== nextState.isOpen) {
      if (nextState.isOpen) {
        var node = this.getDOMNode();
        $(node).openModal({
          complete: function () {
          }
        });
      } else {
        var node = this.getDOMNode();
        $(node).closeModal();
      }
    }
  },
  onChange() {
    this.setState(FileImportStore.getState());
  },
  _closeModal: function () {

  }
});

module.exports = FileImportModal;
