var FileImportStore = require('../stores/FileImportStore.js');
var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var cx = React.addons.classSet;
var FloatButton = require('./FloatButton.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var AddComponentButton = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
  },
  openModal() {
    FileImportStore.openModal();
  },
  doAction() {
    switch (this.props.type) {
      case ComponentTypes.TEXT:
        EditorActionCreator.addComponent(ComponentTypes.TEXT);
        break;
      case ComponentTypes.IMAGE:
        FileImportStore.openModal(ComponentTypes.IMAGE);
        break;
      case ComponentTypes.VIDEO:
        FileImportStore.openModal(ComponentTypes.VIDEO);
        break;
    }
  },
  render: function () {
    var type = this.props.type;
    var classes = cx({
      'mdi-content-text-format': type == ComponentTypes.TEXT,
      'mdi-image-add-to-photos': type == ComponentTypes.IMAGE,
      'mdi-av-videocam': type == ComponentTypes.VIDEO,
      'mdi-action-view-module': type == ComponentTypes.TABLE
    });
    return (
      <FloatButton classes={classes} action={this.doAction}></FloatButton>
    );
  }
});

module.exports = AddComponentButton;
