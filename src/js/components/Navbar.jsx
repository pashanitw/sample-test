var React = require('react');
var AddPageButton=require('./AddPageButton.jsx');
var AddShapesButton=require('./AddShapesButton.jsx');
var AddTextButton=require('./AddTextButton.jsx');
var AddWidgetButton=require('./AddWidgetButton.jsx');
var ExportButton=require('./ExportButton.jsx');
var LogoMenu=require('./LogoMenu.jsx');
var TemplateButton=require('./TemplateButton.jsx');

var Navbar = React.createClass({
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
          <AddTextButton></AddTextButton>
          <AddWidgetButton></AddWidgetButton>
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
