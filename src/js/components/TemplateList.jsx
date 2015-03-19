const React = require('react');
var Snapshot=require('./Snapshot.jsx');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
let TemplateList = React.createClass({
  propTypes:{
    templates:React.PropTypes.array.isRequired
  },
  getDefaultProps(){
    return {
    templates:[]
    }
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
         return <Snapshot page={item.cover} onClick={EditorActionCreator.selectTemplate(item)}></Snapshot>
       })
       }
     </div>
    );
  }
});

module.exports = TemplateList;
