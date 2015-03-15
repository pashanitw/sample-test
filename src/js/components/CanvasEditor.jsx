var React = require('react');

var CanvasEditor = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var template='';
    return (
      <div className="container editor-view">

      </div>
        );
  },

  componentDidMount: function() {
    var template='<div>'+
      '<h2 className="sampleTitle" contentEditable="true">'+
      'CKEditor<br/> Goes Inline!'+
      '</h2>';
    var node=this.getDOMNode();
    var content=JST['src/handlebars/component'];
    var element=  $(content());
    $(element).find('.content').append(template);
    $(node).append(element);
    $( "body" ).droppable();
    $(element).resizable();
    $(element).draggable({

      start: function(event, ui) {
       // isDraggingMedia = true;
      },
      stop: function(event, ui) {
        //isDraggingMedia = false;
        // blah
      }
    });
  }
});

/*<div className="header">
 <div className="headerLeft">
 <h2 className="sampleTitle" contentEditable="true">
 CKEditor<br/> Goes Inline!
 </h2>

 <h3 contentEditable="true">
 Lorem ipsum dolor sit amet dolor duis blandit vestibulum faucibus a, tortor.
 </h3>
 </div>
 <div className="headerRight">
 <div contentEditable="true">
 <p>
 Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas
 malesuada elit lectus felis, malesuada ultricies.
 </p>

 <p>
 Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac,
 laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.
 Vestibulum dapibus, mauris nec malesuada fames ac.
 </p>
 </div>
 </div>
 </div>*/


module.exports = CanvasEditor;
