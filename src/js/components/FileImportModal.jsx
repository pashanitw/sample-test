var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
let FluxibleMixin = require('../mixins/FliuxibleMixin.js');
let propTypes = React.PropTypes;
let FileImportStore = require('../stores/FileImportStore.js');
let EditorActionCreator = require('../actions/EditorActionCreator.js');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var ImageComponent=require('./ImageComponent.jsx');
var update=React.addons.update;

let FileImportModal = React.createClass({
  mixins: [PureRenderMixin],
  statics: {
    storeListeners: [FileImportStore]
  },
  getInitialState() {
    this.source='';
    return FileImportStore.getState();
  },
  render() {
    var inputStyle={
      width:'80%',
      marginLeft:0
    };
    return (
      <div  className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.state.modalHeader}</h4>
          <div className="file-field input-field">
            <input ref='urlSelector' className="file-path validate"
              type="text" onChange={this.urlChoosen}
              style={inputStyle}
              placeholder="Enter The Url Here"/>
            <div className="btn">
              <span>Browse</span>
              <input ref='fileSelector' type="file" onChange={this.fileChosen}/>
            </div>
          </div>
        {
          this.state.type=='image'?<ImageComponent src={this.state.source}></ImageComponent>:null
          }
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action" onClick={this.insertMedia}>Import</a>
        </div>
      </div>
    );
  },
  urlChoosen(evt){
    var value=evt.target.value;

    this.setState(update(this.state, {
        source: {$set:value}
      })
    );
  },
  fileChosen(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = (e)=> {
      var value = e.target.result;
      this.setState(update(this.state, {
          source: {$set:value}
        })
      );
    };
    reader.readAsDataURL(file);
  },
  insertMedia() {
    switch (this.state.type) {
      case ComponentTypes.IMAGE:
        var data = {
          source: this.state.source
        };
        EditorActionCreator.addComponent(ComponentTypes.IMAGE, data);
        break;
      case ComponentTypes.VIDEO:
        console.log("do nothing");
        break;
    }
    this._closeModal();

  },
  componentWillMount() {
    FileImportStore.addChangeListener(this.onChange);
  },
  componentDidMount() {
  },
  clearFlags(){

  },
  componentWillUpdate(nextProps, nextState) {
    var that=this;
    if (this.state.isOpen !== nextState.isOpen) {
      if (nextState.isOpen) {
        var node = this.getDOMNode();
        $(node).openModal({
          complete: function () {
            that._closeModal();
          }
        });
      } else {
        var node = this.getDOMNode();
        $(node).closeModal();
        that._closeModal();
      }
    }
  },
  onChange() {
    this.setState(FileImportStore.getState());
  },
  _closeModal: function () {
    $(this.refs.fileSelector.getDOMNode()).val('');
    $(this.refs.urlSelector.getDOMNode()).val('');
    FileImportStore.closeModal();
  }
});

module.exports = FileImportModal;
