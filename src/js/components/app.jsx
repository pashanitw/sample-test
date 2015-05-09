var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./app-routes.jsx');
var Navbar=require('./Navbar.jsx');
var RouteHandler=Router.RouteHandler;

var app = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <Navbar></Navbar>
        <RouteHandler></RouteHandler>
      </div>


    );
  }
});

module.exports = app;
