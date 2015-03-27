var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var CanvasBar = require('../../handlebars/CanvasEditor.bars');
var HandleBars = require('Handlebars');

var Snapshot = React.createClass({
  getInitialState: function () {
    return {};
  },
  propTypes: {
    page: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      page: {
        components: []
      }
    }
  },
  render: function () {
    var snapStyle = {
      overflow: "hidden"
    };
    var styles = {
      transform: "scale(0.12,0.15)",
      transformOrigin: "0% 0%"
    };
    console.log("properties", this.props);
    return (

      this.transferPropsTo(
        <div className="chapter-frame">
          <div className="snap-shot card-panel" style={snapStyle}>

            <div>
            </div>
          </div>
        </div>
      )
    );

  },
  componentDidMount: function () {
    var bars = '<div class="editor-view">' +
      '{{#each components}}' +
      '{{{this.markup}}}' +
      '{{/each}}' +
      '</div>';
var template=HandleBars.compile(bars);
    template(this.state.page);
    console.log("bars are", template(this.state.page));

  },
  renderScreenShot(object) {

  },
  componentWillReceiveProps(nextProps) {

  }
});

module.exports = Snapshot;
