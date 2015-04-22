var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var AddComponentButton = require('./AddComponentButton.jsx');
var AddPageButton = require('./AddPageButton.jsx');
var AddWidgetButton = require('./AddWidgetButton.jsx');
var ExportButton = require('./ExportButton.jsx');
var LogoMenu = require('./LogoMenu.jsx');
var TemplateButton = require('./TemplateButton.jsx');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var mui = require('material-ui');
var Toggle = mui.Toggle;
var SwitchButton = require('./SwitchButton.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var GutterButton = require('./GutterButton.jsx');
var GeneralModal = require('./GeneralModal.jsx');
var update = React.addons.update;
var LinkedStateMixin=React.addons.LinkedStateMixin;


var Navbar = React.createClass({
  mixins: [PureRenderMixin,LinkedStateMixin],
  getInitialState: function () {
    return {
      tableModelOpen: false,
      rows:10,
      columns:10
    };
  },
  getDefaultProps() {
    return {
      pages: []
    }
  },
  componentDidMount: function () {
  },
  openTableModal() {
    var state = update(this.state, {
      tableModelOpen: {$set: true}
    });
    this.updateState(state);
  },
  closeTableModal() {
    var state = update(this.state, {
      tableModelOpen: {$set: false}
    });
    this.updateState(state);
  },
  updateState(state) {
    this.setState(state);
  },
  gutterChange(evt) {
    EditorActionCreator.addGutter(evt.target.checked);

  },
  toggleGrid(evt) {
    EditorActionCreator.toggleGrid();
  },
  render: function () {
    const functionButtons = {
      display: "inline-block",
      marginLeft: 10
    };
    const componentTypes = {
      display: 'inline-block',
      marginLeft: 10
    };
    return (
      <nav className="toolbar">
        <div className="nav-wrapper">

          <LogoMenu></LogoMenu>

          <div style={functionButtons}>
            <AddPageButton></AddPageButton>
            <TemplateButton></TemplateButton>
          </div>
          <div style={componentTypes}>
            <AddComponentButton
              type={ComponentTypes.TEXT}>
            </AddComponentButton>
            <AddComponentButton
              type={ComponentTypes.IMAGE}>
            </AddComponentButton>
            <AddComponentButton
              type={ComponentTypes.VIDEO}>
            </AddComponentButton>
            <AddComponentButton
              type={ComponentTypes.TABLE}
              openModal={this.openTableModal}>
            </AddComponentButton>
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <div className="switch gutter-switch">
                <label>
                  <input type="checkbox" onChange={this.toggleGrid}/>
                  <span className="lever"></span>
                </label>
                <span>Grid</span>
              </div>
            </li>
            <li>
              <GutterButton></GutterButton>
            </li>
            <ExportButton></ExportButton>
          </ul>
        </div>
        <GeneralModal
          isOpen={this.state.tableModelOpen}
          openModal={this.openTableModal}
          closeModal={this.closeTableModal}
          onOk={this.importTable}
          okText={"Import Table"}>
          <form action="#">
          <p className="range-field">
          <label>Number Of Rows</label>
            <input type="range"  min="0" max="20" valueLink={this.linkState('rows')} />
          </p>
          <p className="range-field">
            <label>Number Of Columns</label>
            <input type="range"  min="0" max="20" valueLink={this.linkState('columns')}/>
          </p>
           </form>
        </GeneralModal>

      </nav>
    );
  },
  importTable:function(){
    var data={
      rows:this.state.rows,
      columns:this.state.columns
    }
    EditorActionCreator.addComponent(ComponentTypes.TABLE, data);
  }
});

module.exports = Navbar;
