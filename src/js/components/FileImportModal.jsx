var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
let FluxibleMixin = require('../mixins/FliuxibleMixin.js');
let propTypes = React.PropTypes;
let FileImportStore = require('../stores/FileImportStore.js');
let EditorActionCreator = require('../actions/EditorActionCreator.js');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;

let FileImportModal = React.createClass({
  mixins: [PureRenderMixin],
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
            <input type="text"/>
          </div>
          <div>
            <p>Enter Url</p>
            <input type="file"  onChange={this.fileChosen}/>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action" onClick={this.insertMedia}>Import</a>
        </div>
      </div>
    );
  },
  fileChosen(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = (e)=> {
      this.uriData = e.target.result;
    }
    reader.readAsDataURL(file);
  },
  insertMedia() {
    switch (this.state.type) {
      case ComponentTypes.IMAGE:
        var data = {
          source: this.uriData
        };
        EditorActionCreator.addComponent(ComponentTypes.IMAGE, data);
        break;
      case ComponentTypes.VIDEO:
        console.log("do nothing");
        break;
    }

  },
  componentWillMount() {
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
            FileImportStore.closeModal();
          }
        });
      } else {
        var node = this.getDOMNode();
        $(node).closeModal();
        FileImportStore.closeModal();
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
