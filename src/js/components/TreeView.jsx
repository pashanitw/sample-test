var React = require('react');
var Snapshot = require('./Snapshot.jsx');
var AddPageButton = require('./AddPageButton.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var EditorStore = require('../stores/EditorStore.js');
var Constants = require('../constants/AppConstants').Constants;
require('react/addons');

var TreeView = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [EditorStore]
  },
  getInitialState: function () {
    return EditorStore.getState();
  },
  componentWillMount: function () {
    console.log(this.props);
  },

  render: function () {
    var cx = React.addons.classSet,
      pages = this.state.pageCollection.pages;
    return (
      <div className="tree-view">
        {
          pages.map(function (page) {
            var classes = cx({
              'child': page.type == Constants.LEVEL_2
            });
            return <Snapshot key={page._id} page={page} clickSnap={page.switch.bind(null,page)} className={classes}></Snapshot>
          })

          }

      </div>
    )
  },
  componentDidMount: function () {
    var slides = this.getDOMNode();
    $(slides).multisortable({
      items: "div.chapter-frame",
      placeholder: "slidePlaceholder",
      stop: this._dragStopped,
      mousedown: this._mousedown,
      click: this._clicked,
      axis: "y"
    });


  },
  _dragStopped: function () {
    console.log('dragging stopped');
  },
  _mousedown: function () {
    console.log("mousedown")
  },
  _clicked: function () {
    console.log('clicked')
  },
  componentWillUnmount: function () {
  },
  onChange: function () {
    this.setState(this.getStore(EditorStore).getState());
  }
});


module.exports = TreeView;
