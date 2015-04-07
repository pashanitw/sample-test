/**
 * Created by space on 3/7/15.
 */
var utils = require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');

class Component {
constructor(model){
  this._id = model&&model.id || utils.getUniqueId();
  this.type=model?model.type:'';
  this.styles=model?model.styles:'';
  this.markup=model?model.markup:'';
}
  updateStyles(styles){
    this.styles=styles
  }
  styleMapper(styles){
    this.styles=styles
  }
}

module.exports = Component;
