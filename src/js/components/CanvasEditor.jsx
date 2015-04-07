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
          key={component._id}
          style={component.styles}
          dangerouslySetInnerHTML={{__html: component.markup}}
          onChange={that.updateHtml.bind(null, component)}
          onBlur={that.updateHtml.bind(null, component)}
          className={"component"}>

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

    var node = this.getDOMNode();
/*

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
    var scope=this;
  this._destroyCk();
    var that=this;
    var node=this.getDOMNode();
    var nodes=$(node).find('[contentEditable="true"]');
    $.each(nodes,function(index,node){
      CKEDITOR.inline(node).on('change', that.updateElement);
    })
    var element = $(node).find('.component');
    $("body").droppable();
    element.resizable();

    element.draggable({
      containment: "parent",
      start: function (event, ui) {
        // isDraggingMedia = true;
      },
      stop: function (event, ui) {
        var $newPosX = ui.offset.left - $(this).parent().offset().left;
        var $newPosY = ui.offset.top - $(this).parent().offset().top;
        var id=$(this).data('reactid');
        scope.state.pageCollection.getSelectedPage().components.some(function(item,index){
         if(id.indexOf(item._id)>-1){
           var styles=item.styles;
           styles.top=$newPosY;
           styles.left=$newPosX;
           item.updateStyles(styles);
         return true;
         }
       })
      }
    })
      .click(function () {
        $(this).draggable({disabled: false});
      })
      .dblclick(function () {
        $(this).draggable({disabled: true});
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
