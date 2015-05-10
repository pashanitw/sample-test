var React = require('react/addons');
var Router=require('react-router');
var Route=Router.Route;
var Redirect=Router.Redirect;
var DefaultRoute=Router.DefaultRoute;


var Home=require('./home.jsx');
var Category=require('./category.jsx');
var App=require('./app.jsx');


var AppRoutes=(
  <Route name="root" path="/" handler={App}>
    <Route name="home" path="categories" handler={Home}></Route>
    <Route name="category" path="categories/:type"  handler={Category}/>
    <DefaultRoute handler={Home}></DefaultRoute>
  </Route>
);

module.exports = AppRoutes;
