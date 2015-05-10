var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./components/app-routes.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var utils=require('./utils/utils.js');
var DataActionCreator=require('./actions/DataActionCreators.js');

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
  .run(function (Handler,params) {
    React.render(<Handler/>, $('#main')[0]);
    DataActionCreator.transition(Handler,params);
  });

