var React = require('react');
var PageModel=require('../models/PageModel.js');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var Snapshot=require('./Snapshot.jsx')
require('react/addons');
var EditorSore=require('../stores/EditorStore.js');
var FluxibleMixin=require('../mixins/FliuxibleMixin.js');
var AddPageButton = React.createClass({
  mixins:[FluxibleMixin],
  statics:{
    storeListeners:[EditorSore]
  },
  getInitialState: function() {
  return EditorSore.getState();
  },
  render: function() {
      var style={
      display:'inline-block',
      position:'relative'
      };
        var cx = React.addons.classSet;
    return (
      <div style={style}>
        <a ref="addComponent" className="add-component dropdown-button  btn-floating btn-large waves-effect waves-light grey" data-activates='dropdown1'>
          <i className="mdi-content-add"></i>
        </a>
        <ul id='dropdown1' className='dropdown-content'>
           {
          this.state.pageCollection.templates.map(function (page,index) {
            var classes = cx({
               "something":true,
              'child': page.type=="page"
            });
            return <li>something</li>

          })
          }
       </ul>
      </div>

    );
  },
  componentDidMount: function() {
var that=this;
    var component=$(this.refs.addComponent.getDOMNode());
      setTimeout(function(){
        component.dropdown({
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
  onChange(){
    this.setState(EditorSore.getState());
  }
});

module.exports = AddPageButton;
