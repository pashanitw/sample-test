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
      <a className="btn-floating btn-large waves-effect waves-light green"
      onClick={this.addPage}>
        <i className="mdi-content-add"></i>
      </a>
    );
  },
  componentDidMount: function() {
  },
  addPage:function(){
    alert("in add page");
    var model=new PageModel();
    EditorActionCreator.addPage(model);
  }
});

module.exports = AddPageButton;
