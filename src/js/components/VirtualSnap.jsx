var React = require('react');
var ComponentContainer = require('./ComponentContainer.jsx');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');
var Components;
var FluxibleMixin = require('../mixins/FliuxibleMixin.js');
var propTypes = React.PropTypes;
var CanvasEditor = React.createClass({
  propTypes: {
    page: propTypes.object.isRequired,
    styles:propTypes.object.isRequired
  },
  onChange() {
  },
  _renderComponents(page) {
    var that = this;
    var components = [];
    if (page) {
      components = page.components.map(function (component) {
        component.styles.position="absolute";
        return <div style={component.styles} dangerouslySetInnerHTML={{__html: component.markup}} >
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
