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
  switchPage(page){
    EditorActionCreator.pageSwitched(page)
  },
  render: function () {
    var cx = React.addons.classSet,
      pages = this.state.pageCollection.pages;
    var that=this;
    return (
      <div className="tree-view">
        {
          pages.map(function (page) {
            var classes = cx({
              'child': page.type == Constants.LEVEL_2
            });
            return <Snapshot key={page._id} page={page} clickSnap={that.switchPage.bind(null,page)} className={classes}></Snapshot>
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
  _dragStopped: function (evetn,ui) {
    var node=this.getDOMNode();
    setTimeout(()=>{
      this.destination=$(node).children().index($(node).find('.selected'));
      EditorActionCreator.reArrangePages(this.source,this.destination);
      console.log("source to destination",this.source,this.destination);
    });
  },
  _mousedown: function (event,target) {
    var node=this.getDOMNode();
    this.source=$(node).children().index(target)
    setTimeout(function(){
      target.click();
    });
  },
  _clicked: function () {
    console.log('clicked')
  },
  componentWillUnmount: function () {
  },
  onChange: function () {
     console.log(this.getStore(EditorStore).getState());
    this.setState(this.getStore(EditorStore).getState());
  }
});


module.exports = TreeView;
