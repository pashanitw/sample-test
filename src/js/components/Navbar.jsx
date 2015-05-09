var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var mui=require("material-ui");
var AppLeftNav=require('./LeftNav.jsx');
var NavigationMenu=mui.Icons.NavigationMenu;
var header = <div className="logo">Gk India!</div>;
var { AppBar, AppCanvas, Menu, IconButton,DropDownMenu,LeftNav,MenuItem,Toolbar,ToolbarGroup } = mui;
var   menuItems = [
  {  route: 'home', text: 'Home' },
  {  route: 'login', text: 'Login' },
  {  route: 'feedback', text: 'FeedBack' },
  { type: MenuItem.Types.SUBHEADER, text: 'Categories' },
  {  route: 'category',params:{type:"geography"}, text: 'Geography' },
  {  route: 'category',params:{type:"general_science"}, text: 'GeneralScience' },
  {  route: 'category',params:{type:"economy"}, text: 'Economy' },
  {  route: 'category',params:{type:"history"}, text: 'History' },
  {  route: 'category',params:{type:"politics"}, text: 'Politics' },
  {  route: 'category',params:{type:"sports"}, text: 'Sports' },
];
var filterOptions = [
  { payload: '1', text: 'Geography' },
  { payload: '2', text: 'Sports' },
  { payload: '3', text: 'Economy' },
  { payload: '4', text: 'History' },
  { payload: '5', text: 'Politics' },
  { payload: '6', text: 'Active Voice' },
  { payload: '7', text: 'Active Text' },
];
var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];
var navigationMenuStyle={
  marginLeft:10
};
var title="gkindia";
var Navbar = React.createClass({
  getInitialState: function() {
    return {};
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
  },
  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },
  render: function() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">GK India !</a>
            <a><i style={navigationMenuStyle} className="left mdi-navigation-menu" onTouchTap={this._onLeftIconButtonTouchTap}></i></a>
          </div>
        </nav>
        <LeftNav ref="leftNav"
          menuItems={menuItems}
          docked={false}
          isInitiallyOpen={false}
          header={header}
          onChange={this._onLeftNavChange}
        />
      </div>


    );
  },
  _openSideNavMenu(){
    this.refs.leftNav.toggle();
  },
  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route,payload.params);
  }
});

module.exports = Navbar;
