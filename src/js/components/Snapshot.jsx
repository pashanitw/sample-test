var React = require('react');
var CanvasEditor = require('./CanvasEditor.jsx');
var CanvasBar = require('../../handlebars/CanvasEditor.bars');
var HandleBars = require('Handlebars');
var VirtualSnap=require('./VirtualSnap.jsx');
var styles = {
  transform: "scale(0.12,0.15)",
  transformOrigin: "0% 0%"
};
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

    console.log("properties", this.props);
    return (

      this.transferPropsTo(
        <div className="chapter-frame">
          <div className="snap-shot card-panel" style={snapStyle}>
          </div>
        </div>
      )
    );

  },
  componentDidMount: function () {

    var node= this.getDOMNode();
    var snap=$(node).find('.snap-shot')[0];
    React.render(<VirtualSnap styles={styles} page={this.props.page}/>, snap);
  },
  renderScreenShot(object) {

  },
  componentWillReceiveProps(nextProps) {

  }
});

module.exports = Snapshot;
