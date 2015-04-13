var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Snapshot=require('./Snapshot.jsx');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
let TemplateList = React.createClass({
  mixins:[PureRenderMixin],
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
         return <div onClick={that.handleClick.bind(null,item)}>
           <Snapshot key={index} page={item.pages[0]}></Snapshot>
           <span>{item.title}</span>
         </div>
       })
       }
     </div>
    );
  }
});

module.exports = TemplateList;
