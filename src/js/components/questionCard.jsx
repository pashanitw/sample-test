var React = require('react/addons');
var mui = require('material-ui');
var {PropTypes}=React;
var {RadioButtonGroup,RadioButton}=mui;
var RadioGroup = require('./RadioGroup.jsx');
var _=require('lodash');


var QuestionCard = React.createClass({
  getInitialState: function () {
    return {};
  },
  propTypes: {
    question: PropTypes.object.required
  },
  componentDidMount: function () {
  },

  render: function () {
    var question = this.props.question;
    return (
      <div className="card">
        <div className="card-image">
        {
          question.img ?
            <div>
              <img src={question.img.url}/>
              <span className="card-title">{question.img.title}</span>
            </div>
            : null
          }

        </div>
        <div className="card-content">
        {
          _.isArray(question.question)?
            question.question.map(function(item){
              return <p>{item}</p>
            }):
            <p>{question.question}</p>
          }
          <div>
            <RadioGroup
              id={question._id}
              data={question.choice}
              name={this.props.name}
              key={question.id}
            >
            </RadioGroup>
          </div>
        </div>
      {question.reference ?
        <div className="card-action">
          <a href={question.reference.link}>question.reference.text</a>
        </div> :
        null
        }

      </div>
    );
  }
});

module.exports = QuestionCard;
