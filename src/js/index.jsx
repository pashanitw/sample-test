var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./components/app-routes.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var utils=require('./utils/utils.js');

injectTapEventPlugin();
/**/
$.ajaxSetup({
  beforeSend: function (xhr) {
    utils.showProgress();
  }
});
Router
  .create({
    routes: AppRoutes,
    scrollBehaviour: Router.ScrollToTopBehavior
  })
  .run(function (Handler) {
    React.render(<Handler/>, $('#main')[0]);

  });

