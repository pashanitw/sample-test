const React = require('react');
let TemplateList=require("./TemplateList.jsx")
let MaterialModal = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    modalHeader: React.PropTypes.string.isRequired,
    templates: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {};
  },
  getDefaultProps() {
    return {
      isOpen: false,
      modalHeader: "Please Set Header",
      templates: []
    }
  },
  componentWillMount() {

  },
  render() {
    return (
      <div  class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>{this.props.modalHeader}</h4>
          <TemplateList templates={this.props.templates}/>
        </div>
        <div class="modal-footer">
          <a href="#" class="waves-effect waves-green btn-flat modal-action modal-close">Agree</a>
        </div>
      </div>
    );
  },
  componentDidMount() {
  },
  componentWillReceiveProps(nextprops){
     if(this.props.isOpen!==nextprops.isOpen){
       if(nextprops.isOpen){
         var node=this.getDomNode();
         $(node).openModal();
       }else{
         var node=this.getDomNode();
         $(node).closeModal();
       }
     }
  },
  componentWillUnMount(){
  },
  _closeModal:function(){

  }
});

module.exports = MaterialModal;
