var React = require('react');
var CanvasEditor=require('./CanvasEditor.jsx')

var Snapshot = React.createClass({
  getInitialState: function () {
    return {};
  },
  propTypes:{
    page:React.PropTypes.object.isRequired
  },
  render: function () {
    var snapStyle={
      overflow:"hidden"
    };
    var styles={
      transform:"scale(0.12,0.15)",
      transformOrigin:"0% 0%"
    };
    console.log("properties",this.props);
    return (

      this.transferPropsTo(
        <div className="chapter-frame">
          <div className="snap-shot card-panel" style={snapStyle}>
            <CanvasEditor components={this.props.page.components} compstyle={styles}></CanvasEditor>
          </div>
        </div>
      )
    );

  },
  componentDidMount: function () {

  },
  renderScreenShot(object){

  },
  componentWillReceiveProps(nextProps){

  }
});

module.exports = Snapshot;
