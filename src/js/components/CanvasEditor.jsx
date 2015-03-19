var React = require('react');
var ComponentContainer=require('./ComponentContainer.jsx');
var assign = require('object-assign');
var Components;
var CanvasEditor = React.createClass({
  getInitialState: function () {
    return {};
  },
  propTypes:{
    components:React.PropTypes.array.isRequired,
    compstyle:React.PropTypes.object.isRequired
  },
  getDefaultProps(){
    return {
      components:[],
      compstyle:null
    }
  },
  componentWillMount: function () {

  },
  render: function () {
    var that=this;
    return (
      <div className="editor-view" style={this.props.compstyle}>
      {

        this.props.components.map(function(component){
          return <ComponentContainer style={component.styles}>
            <div dangerouslySetInnerHTML={{__html:component.markup}}>
            </div>
            </ComponentContainer>

        })
        }
      </div>
    )
  },

  componentDidMount: function () {

    var node = this.getDOMNode();
    var element = $(node).find('.component');
    $(node).append(element);
    $("body").droppable();
    $(element).resizable();

    $(element).draggable({
      containment: "parent",
      start: function (event, ui) {
        // isDraggingMedia = true;
      },
      stop: function (event, ui) {
        //isDraggingMedia = false;
        // blah
      }
    })
      .click(function () {
        $(this).draggable({disabled: true});
      })
      .mousemove(function () {
        $(this).draggable({disabled: false});
      });
  }
});



module.exports = CanvasEditor;
