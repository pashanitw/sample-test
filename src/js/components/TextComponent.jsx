var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var reactDnd=require('react-dnd');
var _ = require("lodash");
var update=React.addons.update;



var TextComponent = React.createClass({

  mixins: [PureRenderMixin],
  render() {
    const styles = {
      position: 'absolute',
      border: '1px dashed gray',
      padding: '0.5rem'
    };
    var props = this.props;
    var that = this;
    return (
      <div style={this.props.childStyle}>
        {
          this.props.isEditable?

          <div ref="editable" contentEditable="true" dangerouslySetInnerHTML={{__html: props.markup}}
            onBlur={this.updateComponentMarkup}>
          </div>
            :
            <div ref="uneditable" dangerouslySetInnerHTML={{__html: props.markup}}
             >
            </div>

          }
      </div>


)
  },
  enableEditable(evt){
    evt.preventDefault();

    var element = that.refs.editable.getDOMNode();
    $(element).focus();
    if(this.props.elementFocused){
      this.props.elementFocused();
    }
    var that=this;
    _.debounce(function () {

    }, 300)();


  },
  mousedown(){
  },
  componentDidMount() {
    if(this.props.isEditable){
      var element = this.refs.editable.getDOMNode();
      CKEDITOR.inline(element);
      CKEDITOR.on('configLoaded', function (event) {
        var editor=event.editor;
        alert(editor.config)
      })
      $(element).focus();
    }
  },
  componentDidUpdate(){
    if(this.props.isEditable){
      var element = this.refs.editable.getDOMNode();
      CKEDITOR.editorConfig = function( config ) {
        config.allowedContent = true;
      };
      CKEDITOR.inline(element);

      $(element).focus();
    }
  },
  componentWillUpdate(){
   this. _destroyCk();
  },
  _destroyCk() {
    for (var name in CKEDITOR.instances) {
      CKEDITOR.instances[name].destroy()
    }
  },
  updateComponentMarkup(evt){

    var html= $(evt.target).html();
    EditorActionCreator.updateComponentMarkup(this.props.index,html)

  }

});

module.exports = TextComponent;
