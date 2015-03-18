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
       this.props.templates.map(function(){
         return <Snapshot></Snapshot>
       })
       }
     </div>
    );
  }
});

module.exports = TemplateList;
