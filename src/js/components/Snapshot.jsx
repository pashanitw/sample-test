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


        <div className="chapter-frame" onClick={this.props.clickSnap}>
          <div ref="snap" className="snap-shot card-panel" style={snapStyle}>
            <VirtualSnap styles={styles} page={this.props.page}/>
          </div>
        </div>
    );

  },
  componentDidMount: function () {

  },
  renderScreenShot(object) {

  },
  componentWillReceiveProps(nextProps) {

  }
});

module.exports = Snapshot;
