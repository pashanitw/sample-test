var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var {Link}=Router;
var mui = require("material-ui");
var {Paper}=mui;
var DataActionCreator = require('../actions/DataActionCreators.js');
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var {PureRenderMixin}=React.addons;
var BaseStore = require('../stores/BaseStore.js');
var home = React.createClass({
  mixins: [FluxibleMixin, PureRenderMixin],
  getInitialState: function () {
    return {};
  },

  statics: {
    storeListeners: [BaseStore]
  },
  componentDidMount: function () {
  },

  render: function () {
    return (
      <div>
        <div className="collection">
          <ul>

          {
            this.state.data ?
              this.state.data.map(function (category,index) {
                return <li key={index} className="collection-item list-collection">
                  <Link  className="collection-item" to="category" params={{type: category.route}}>
                    <span>{category.name}</span>
                    <i className="mdi-content-send right"></i>
                  </Link>
                </li>
              }) :
              null
            }
          </ul>
        </div>
      </div>

    );
  },
  onChange() {
    this.setState(BaseStore.getState());
  }
});

module.exports = home;
