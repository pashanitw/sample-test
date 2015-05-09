var React = require('react');
var RadioButton = require('./RadioButton.jsx');

var _answerId = '';
var validation = {
  position: "absolute",
  right: 15,
  /* top: 0; */
  bottom: 10
};
var RadioGroup = React.createClass({
  getInitialState: function () {
    return {
      selectedId: '',
      isAnswer: false,
      isSelected:false
    };
  },
   _answerId : '',

  componentDidMount: function () {
  },

  render: function () {
    var groupName = this.props.groupName;
    return (
      <div>
{
  this.props.data.map((item, index)=> {
    var _id = this.props.id + "_" + index;
    if (item.isAnswer) {
      this._answerId = _id;
    }
    return <RadioButton
      name={this.props.id}
      label={item.option}
      isAnswer={item.isAnswer}
      action={this.onSelect}
      onClick={this.onSelect}
      selectedId={this.state.selectedId}
      id={_id}
    >
    </RadioButton>

  })
  }  {
        this.state.isSelected?
        <div style={validation}>
        {
          this.state.isAnswer?
            <a className="btn-floating btn-large waves-effect waves-light green">
              <i className="mdi-action-done"></i>
            </a>
            :
            <a className="btn-floating btn-large waves-effect waves-light red">
              <i className="mdi-alert-error"></i>
            </a>

          }

        </div>:null
        }

      </div>

    );
  },
  onSelect(id) {
    var isAnswer = false;
    if (id == this._answerId) {
      isAnswer = true;
    }
    this.setState({
      selectedId: id,
      isAnswer: isAnswer,
      isSelected:true
    })
  }
});

module.exports = RadioGroup;
