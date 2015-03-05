var React = require('react');

var Snapshot = React.createClass({
  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
  },

  render: function () {
    return (
      this.transferPropsTo(
        <div className="chapter-frame">
          <div className="snap-shot card-panel">
          </div>
        </div>
      )
    );

  }
});

module.exports = Snapshot;
