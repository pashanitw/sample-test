const React = require('react');
var Snapshot=require('./Snapshot.jsx');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
let TemplateList = React.createClass({
  propTypes:{
    templates:React.PropTypes.array.isRequired
  },
  getInitialState() {
    return {};
  },
handleClick:function(item){
  EditorActionCreator.selectTemplate(item);
  if(this.props.onSelect){
    this.props.onSelect();
  }
},
  componentDidMount() {
  },

  render() {
    var that=this;
    return (
     <div>
     {
       this.props.templates.map(function(item,index){
         return <div>
           <Snapshot key={index} page={item.pages[0]} onClick={that.handleClick.bind(null,item)}></Snapshot>
           <span>{item.title}</span>
         </div>
       })
       }
     </div>
    );
  }
});

module.exports = TemplateList;
