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
      <a className="add-component btn-floating btn-large waves-effect waves-light grey"
      onClick={this.addPage}>
        <i className="mdi-content-add"></i>
      </a>
    );
  },
  componentDidMount: function() {
  },
  addPage:function(){
    alert("in add page");
    console.log(CKEDITOR.instances);
    var model=new PageModel();
    EditorActionCreator.addPage(model);
  }
});

module.exports = AddPageButton;
