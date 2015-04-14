const React = require('react/addons');
const PropTypes = React.PropTypes;
const Snapshot = require('./Snapshot.jsx');
const cx = React.addons.classSet;
var mui = require('material-ui');
var Menu = mui.Menu;
var Paper = mui.Paper;
let PageMenu = React.createClass({

  propTypes: {
    menuItems: PropTypes.array.isRequired
  },
  componentDidMount() {
  },
  doAction(item) {
    if (this.props.onItemClick) {
    }
    this.props.onItemClick(item);
  },
  render() {
    var style = {
      position: 'absolute',
      height:'auto',
      width:'auto',
      zIndex:2000
    };
    var container = {
      position: 'absolute',
      zIndex:1000,
      width:200
    };
    var classes={
      'mui-menu mui-menu-hideable mui-visible mui-paper mui-z-depth-1 mui-rounded':true

    };
    return (
      this.props.visible?
        <div style={style}>
        <Paper zDepth={5}>

           {
             this.props.menuItems.map((page, index) => {

               return <Snapshot key={index} page={page} clickSnap={this.doAction.bind(null, page)}/>

             })
             }
        </Paper>
        </div>
     :null
    );
  }
});

module.exports = PageMenu;
