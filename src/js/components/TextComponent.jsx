var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var MousetrapMixin = require('../mixins/MousetrapMixin.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Constants = require('../constants/AppConstants');
var ComponentTypes = Constants.ComponentTypes;
var reactDnd = require('react-dnd');
var _ = require("lodash");
var update = React.addons.update;


var TextComponent = React.createClass({

  mixins: [PureRenderMixin],
  getInitialState(){
    return {
      isEditable:false
    }
  },
  render() {
    const styles = {
      position: 'absolute',
      border: '1px dashed gray',
      padding: '0.5rem'
    };
    var props = this.props;
    var that = this;
    return (
      <div style={this.props.childStyle} onDoubleClick={this.onDoubleClick}>
        {
          this.state.isEditable ?

            <div ref="editable" contentEditable="true" dangerouslySetInnerHTML={{__html: props.markup}}>
            </div>
            :
            <div ref="uneditable" dangerouslySetInnerHTML={{__html: props.markup}}>
            </div>

          }
      </div>


    )
  },
  onDoubleClick(){
    this.setState({
      isEditable:true
    })
  },
  enableEditable(evt) {
    evt.preventDefault();

    var element = that.refs.editable.getDOMNode();
    $(element).focus();
    if (this.props.elementFocused) {
      this.props.elementFocused();
    }
    var that = this;
    _.debounce(function () {

    }, 300)();


  },
  mousedown() {
  },
  componentDidMount() {
   /* if (this.props.isEditable) {
      var element = this.refs.editable.getDOMNode();
      CKEDITOR.inline(element);
      $(element).focus();
    }*/
  },
  componentDidUpdate() {
    if (this.state.isEditable) {
      var element = this.refs.editable.getDOMNode();

     var editor= CKEDITOR.inline(element, {
        allowedContent: true
      });
     $(element).focus();
      var that=this;
      editor.on('blur', function(event) {
        // Do something, Example: disable toolbar:

        editor.focusManager.blur();
        that.updateComponentMarkup(editor.getData());
        that._destroyCk();
        that.makeUneditable();
      });
    }
  },
  makeUneditable() {
    this.setState({
      isEditable: false
    })
  },
  _destroyCk() {
    for (var name in CKEDITOR.instances) {
      CKEDITOR.instances[name].destroy()
    }
  },
  updateComponentMarkup(html) {
    if(this.props.isNested){
      EditorActionCreator.updateNestedComponentMarkup(this.props.parentProps.index,this.props.index,html);
    }else{
      EditorActionCreator.updateComponentMarkup(this.props.index, html)

    }

  }

});

module.exports = TextComponent;
