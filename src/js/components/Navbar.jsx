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
var EditorActionCreator=require('../actions/EditorActionCreator.js');


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
   console.log(evt.target.value);
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
                  <input type="checkbox" onChange={this.gutterChange}/>
                    <span className="lever"></span>
                  </label>
                <span>Gutter</span>
                </div>
              </li>
              <ExportButton></ExportButton>
            </ul>
          </div>
        </nav>
        );
        }
        });

        module.exports = Navbar;
