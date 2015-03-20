var React = require('react');
var PageModel=require('../models/PageModel.js');
var EditorActionCreator=require('../actions/EditorActionCreator.js');
var AddPageButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount:function(){

  },
  render: function() {
    return (
      <div>
        <a className="add-component dropdown-button  btn-floating btn-large waves-effect waves-light grey"
          onClick={this.addPage}
          data-activates='dropdown1'>
          <i className="mdi-content-add"></i>
        </a>
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li class="divider"></li>
          <li><a href="#!">three</a></li>
        </ul>
      </div>

    );
  },
  componentDidMount: function() {

  },
  addPage:function(){
    $(this.getDOMNode()).find('.add-component').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );
  /*  console.log(CKEDITOR.instances);
    var model=new PageModel();
    EditorActionCreator.addPage(model);*/
  }
});

module.exports = AddPageButton;
