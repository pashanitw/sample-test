var React = require('react');
var mui = require('material-ui')
var Classable = mui.Mixins.Classable;
var ClickAwayable = mui.Mixins.ClickAwayable;
var DropDownArrow = mui.DropDownIcon;
var Paper = mui.Paper;
var Menu = mui.Menu;
var PageMenu=require('./PageMenu.jsx');

var DropDownMenu = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      autoWidth: true
    };
  },

  getInitialState: function() {
    return {
      open: false,
      selectedIndex: this.props.selectedIndex || 0
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(nextProps);
  },
  open(){

    return {
      open: true,
      selectedIndex: this.props.selectedIndex || 0
    }

  },
  render: function() {
    var classes = this.getClasses('mui-drop-down-menu', {
      'mui-open': this.state.open
    });
    var menuItems=this.props.menuItems;
    return (
      <div className={classes}>
        <div className="mui-menu-control" onClick={this._onControlClick}>
          <Paper className="mui-menu-control-bg" zDepth={0} />
        {this.props.children}
          <div className="mui-menu-control-underline" />
        </div>
        <PageMenu
          ref="menuItems"
          menuItems={menuItems}
          hideable={true}
          visible={this.state.open}
          onItemClick={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var el = this.getDOMNode(),
      menuItemsDom = this.refs.menuItems.getDOMNode();

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  }

});

module.exports = DropDownMenu;
