var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var ComponentContainer = require('./ComponentContainer.jsx');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');
var Components;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var propTypes = React.PropTypes;
const componentRegistry = require('../service/Registry.js');
var CanvasEditor = React.createClass({
  mixins:[PureRenderMixin],
  propTypes: {
    page: propTypes.object.isRequired,
    styles:propTypes.object.isRequired
  },
  _renderComponents(page) {
    var that = this;
    var components = [];
    if (page) {
      components = page.components.map(function (component) {
        component.styles.position="absolute";
        return <div style={component.styles}>
        {componentRegistry(component, false)}
          </div>
      })
    }
    return components;
  },
  render: function (component) {

    return (
      <div className="editor-view" style={this.props.styles}>
      {
        this._renderComponents(this.props.page)
        }
      </div>
    )
  }
});


module.exports = CanvasEditor;
