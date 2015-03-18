const React = require('react');
var DatStore=require('../stores/DataStore.js');
let Templates = React.createClass({
  getInitialState() {
    return {};
  },
  propTypes:function(){
    templates:React.PropTypes.array.isRequired
  },
  componentDidMount() {
  },

  render() {
    return (
      <div>
      {
        this.propTypes.templates.map(function(template){

        })
        }
      </div>
    );
  }
});

module.exports = Templates;
