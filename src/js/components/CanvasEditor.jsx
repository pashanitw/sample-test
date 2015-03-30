var React = require('react');
var ComponentContainer = require('./ComponentContainer.jsx');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');
var Components;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var CanvasEditor = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [EditorStore]
  },
  getInitialState: function () {
    return EditorStore.getState();
  },
  updateHtml: function (component, html) {
    component.markup = $(html.target).html();
    EditorStore.emitChange();
  },
  onChange() {
    this.setState(this.getStore(EditorStore).getState());
  },
  _renderComponents(selectedPage) {
    var that = this;
    var components = [];
    if (selectedPage) {
      components = selectedPage.components.map(function (component) {
        return <div contentEditable="true"
          style={component.styles}
          dangerouslySetInnerHTML={{__html: component.markup}}
          onChange={that.updateHtml.bind(null, component)}
          onBlur={that.updateHtml.bind(null, component)}>

        </div>

      })
    }
    return components;
  },
  render: function (component) {
    var that = this,
      pageCollection = this.state.pageCollection,
      selectedPage = pageCollection.getSelectedPage(),
      components = [];



    return (
      <div className="editor-view">
      {
        this._renderComponents(selectedPage)

        }
      </div>
    )
  },

  componentDidMount: function () {


/*
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
      });*/
  },
  updateElement(evt){
    debugger;
  //  evt.editor.updateElement();
  },
  componentDidUpdate(){
  this._destroyCk();
    var that=this;
    var node=this.getDOMNode();
    var nodes=$(node).find('[contentEditable="true"]');
    $.each(nodes,function(index,node){
      CKEDITOR.inline(node).on('change', that.updateElement);
    })

  },
  _configureCk() {
  },
  _destroyCk(){
    for(var name in CKEDITOR.instances)
    {
      CKEDITOR.instances[name].destroy()
    }
  }
});


module.exports = CanvasEditor;
