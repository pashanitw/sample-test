var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var AddComponentButton=require('./AddComponentButton.jsx');
var AddPageButton=require('./AddPageButton.jsx');
var AddWidgetButton=require('./AddWidgetButton.jsx');
var ExportButton=require('./ExportButton.jsx');
var LogoMenu=require('./LogoMenu.jsx');
var TemplateButton=require('./TemplateButton.jsx');
var Constants = require('../constants/AppConstants');
var ComponentTypes=Constants.ComponentTypes


var Navbar = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState: function() {
    return {};
  },
  getDefaultProps(){
  return {
  pages:[]
  }
  },
  componentDidMount: function() {
  },

  render: function() {
    return (
      <nav className="toolbar">
        <div className="nav-wrapper">
          <LogoMenu></LogoMenu>
          <AddPageButton></AddPageButton>
          <TemplateButton></TemplateButton>
          <AddComponentButton type={ComponentTypes.TEXT}></AddComponentButton>
          <AddComponentButton type={ComponentTypes.IMAGE}></AddComponentButton>
          <AddComponentButton type={ComponentTypes.VIDEO}></AddComponentButton>
          <AddComponentButton type={ComponentTypes.TABLE}></AddComponentButton>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="something.html">Preview</a></li>
            <li><a href="something.html">Export</a></li>
            <ExportButton></ExportButton>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
