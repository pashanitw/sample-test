var React = require('react');
var AddPageButton=require('./AddPageButton.jsx');
var AddShapesButton=require('./AddShapesButton.jsx');
var AddTextButton=require('./AddTextButton.jsx');
var AddWidgetButton=require('./AddWidgetButton.jsx');

var Navbar = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <nav className="toolbar">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <AddPageButton></AddPageButton>
          <AddShapesButton></AddShapesButton>
          <AddTextButton></AddTextButton>
          <AddWidgetButton></AddWidgetButton>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="something.html">Sass</a></li>
            <li><a href="something.html">Components</a></li>
            <li><a href="something.html">JavaScript</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
