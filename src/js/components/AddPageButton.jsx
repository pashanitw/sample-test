var React = require('react');
var PageModel = require('../models/PageModel.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Snapshot = require('./Snapshot.jsx')
require('react/addons');
var EditorSore = require('../stores/EditorStore.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var AddPageButton = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [EditorSore]
  },
  getInitialState: function () {
    return EditorSore.getState();
  },
  render: function () {
    var style = {
      display: 'inline-block',
      position: 'relative',
      height: 300
    };
    var that = this;
    var cx = React.addons.classSet;
    return (
      <div style={style}>
        <a ref="addComponent"
          className="add-component dropdown-button  btn-floating btn-large waves-effect waves-light grey"
          onClick={this.togglePages}>
          <i className="mdi-content-add"></i>
        </a>
      {
        this.state.showPages ?
          (<ul className='add-templates'>
           {
             this.state.pageCollection.templates.map((page, index) => {
               var classes = cx({
                 "something": true,
                 'child': page.type == "page"
               });
               return <li key={index}>
                 <Snapshot page={page} clickSnap={that.addPage.bind(null, page)}/>
               </li>

             })
             }
          </ul>) : null
        }

      </div>

    );
  },
  togglePages:function(){
   var state=this.state;
    state.showPages=!state.showPages;
    this.setState(state);
  },
  componentDidMount: function () {

  },
  componentDidUpdate() {
    var that = this;
    var component = $(this.refs.addComponent.getDOMNode());
    setTimeout(function () {
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

    })
  },
  onChange() {
    this.setState(EditorSore.getState());
  },
  addPage(template) {
    this.togglePages();
    EditorActionCreator.addPage(template);
  }
});

module.exports = AddPageButton;
