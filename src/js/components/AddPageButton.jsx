var React = require('react');
var PageModel=require('../models/PageModel.js');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var Snapshot=require('./Snapshot.jsx')
require('react/addons');
var AddPageButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount:function(){

  },
  render: function() {
      var style={
      display:'inline-block',
      position:'relative'
      };
        var cx = React.addons.classSet;
    return (
      <div style={style}>
        <a className="add-component dropdown-button  btn-floating btn-large waves-effect waves-light grey"
          onClick={this.addPage}
          data-activates='dropdown1'>
          <i className="mdi-content-add"></i>
        </a>
        <ul id='dropdown1' className='dropdown-content'>
           {
          this.props.pages.map(function (page,index) {
            var classes = cx({
              'child': page.type=="page"
            });
        if(index>1){
            return <li><Snapshot page={page}  className={classes}></Snapshot></li>
        }
            
          })
          } 
       </ul>
      </div>

    );
  },
  componentDidMount: function() {
var that=this;
      setTimeout(function(){
      $(that.getDOMNode()).find('.add-component').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );

      },2000)
  },
  addPage:function(){
      /*  console.log(CKEDITOR.instances);
    var model=new PageModel();
    EditorActionCreator.addPage(model);*/
  }
});

module.exports = AddPageButton;
