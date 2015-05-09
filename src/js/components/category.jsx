var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DataActionCreator = require("../actions/DataActionCreators.js");
var {PureRenderMixin}=React.addons;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var BaseStore = require('../stores/BaseStore.js');
var QuestionCard = require('./questionCard.jsx');

var category = React.createClass({
  mixins: [FluxibleMixin, PureRenderMixin],
  getInitialState: function () {
    return {};
  },

  statics: {
    storeListeners: [BaseStore]
  },
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function () {
    this.sendActionForData();
  },
  sendActionForData() {
    var type = this.context.router.getCurrentParams().type;
    if (type && type != this.route) {
      DataActionCreator.fetchCategoryByName(type);
      this.route = type;
    }
  },
  route: '',
  render: function () {
    return <div>
   {
     this.state.data ?
       this.state.data.map(function (item, index) {
         var name = "name-" + index;
         return <QuestionCard question={item} name={name}></QuestionCard>
       })
       :
       null
     }

    </div>

  },
  componentWillUpdate() {
    this.sendActionForData();
  },
  onChange() {
    this.setState(BaseStore.getState());
  },
  componentWillUnmount() {
    alert("unmounted");
  }

});

module.exports = category;
