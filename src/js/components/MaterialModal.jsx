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
      <div  className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.props.modalHeader}</h4>
          <TemplateList templates={this.props.templates}/>
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Agree</a>
        </div>
      </div>
    );
  },
  componentDidMount() {
  },
  componentWillReceiveProps(nextprops){
     if(this.props.isOpen!==nextprops.isOpen){
       if(nextprops.isOpen){
         var node=this.getDOMNode();
         $(node).openModal();
       }else{
         var node=this.getDOMNode();
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
