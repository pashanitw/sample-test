const React = require('react');

let GeneralModal = React.createClass({

  componentDidMount() {
  },

  render() {
    return (
      <div  className="modal modal-fixed-footer">
        <div className="modal-content">
        {this.props.children}
        </div>
        <div className="modal-footer">
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close" onClick={this._onOk}>{this.props.okText}</a>
        </div>
      </div>
    );
  },
  componentWillUpdate(nextProps){
    var that=this;
    if (this.props.isOpen !== nextProps.isOpen) {
      if (nextProps.isOpen) {
        var node = this.getDOMNode();
        $(node).openModal({
          complete: function () {
                    that.closeModal()
                 }
        });
      } else {
        var node = this.getDOMNode();
        $(node).closeModal();
      }
    }
  },
  _onOk(){
    if(this.props.onOk){
      this.props.onOk();
    }
    this.closeModal();
  },
  closeModal(){
    if(this.props.closeModal){
      this.props.closeModal();
    }
  }

});

module.exports = GeneralModal;
