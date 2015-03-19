const React = require('react');
var Snapshot=require('./Snapshot.jsx');
let TemplateList = React.createClass({
  propTypes:{
    templates:React.PropTypes.array.isRequired
  },
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    return (
     <div>
     {
       this.props.templates.map(function(item){
         return <Snapshot page={item}></Snapshot>
       })
       }
     </div>
    );
  }
});

module.exports = TemplateList;
