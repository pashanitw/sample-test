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
var SwitchButton=require('./SwitchButton.jsx');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var GutterButton=require('./GutterButton.jsx');


var Navbar = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {};
  },
  getDefaultProps() {
    return {
      pages: []
    }
  },
  componentDidMount: function () {
  },
 gutterChange(evt){
     EditorActionCreator.addGutter(evt.target.checked);

 },
  toggleGrid(evt){
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
            <AddComponentButton type={ComponentTypes.TEXT}></AddComponentButton>
            <AddComponentButton type={ComponentTypes.IMAGE}></AddComponentButton>
            <AddComponentButton type={ComponentTypes.VIDEO}></AddComponentButton>
            <AddComponentButton type={ComponentTypes.TABLE}></AddComponentButton>
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
        </nav>
        );
        }
        });

        module.exports = Navbar;
