var Snapshot = require('./Snapshot.jsx');
var AddPageButton = require('./AddPageButton.jsx');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var EditorStore = require('../stores/EditorStore.js');
var Constants = require('../constants/AppConstants').Constants;
var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CanvasStore=require('../stores/CanvasStore.js');
var update=React.addons.update;

var TreeView = React.createClass({
  mixins: [FluxibleMixin,PureRenderMixin],
  statics: {
    storeListeners: [EditorStore]
  },
  getInitialState: function () {
    return {
      pages:EditorStore.getState().pageCollection.pages
    }

  },
  switchPage(page){
    EditorActionCreator.pageSwitched(page)
  },
  updatePages(id){
    EditorActionCreator.updatePages(this.state.pages);
    var page=this.state.pages.filter(c => c._id === id)[0];
    this.switchPage(page);
  },
  render: function () {
    var cx = React.addons.classSet,
      pages = this.state.pages;
    var that=this;
    return (
      <div className="tree-view">
        {
          pages.map(function (page) {
            var classes = cx({
              'child': page.type == Constants.LEVEL_2
            });
            return <Snapshot
              key={page._id}
              page={page}
              clickSnap={that.switchPage.bind(null,page)}
              className={classes}
              moveSnapshot={that.moveSnapshot}
              updatePages={that.updatePages}>
            </Snapshot>
          })

          }

      </div>
    )
  },
  moveSnapshot(id, afterId) {
    console.log("moving snapshot",id,afterId);
    const {pages} = this.state;

    const page = pages.filter(c => c._id === id)[0];
    const afterPage = pages.filter(c => c._id === afterId)[0];
    const pageIndex = pages.indexOf(page);
    const afterIndex = pages.indexOf(afterPage);
    page.index=afterIndex;
    afterPage.index=pageIndex;
    this.setState(update(this.state, {
      pages: {
        $splice: [
          [pageIndex, 1],
          [afterIndex, 0, page]
        ]
      }
    }));
  },
  componentDidMount: function () {
    var slides = this.getDOMNode();

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
    this.setState({pages:this.getStore(EditorStore).getState().pageCollection.pages});
  }
});


module.exports = TreeView;
