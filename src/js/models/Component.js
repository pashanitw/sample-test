/**
 * Created by space on 3/7/15.
 */
var utils = require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var ComponentTypes=require('../constants/AppConstants.js').ComponentTypes;

class Component {
constructor(type,model){
  if(!type){
    console.warn("Did not pass any type to Component Model Constructor");
  }
  this._id = model&&model.id || utils.getUniqueId();
  if(type){
    this.type=type;
  }
  this.styles=model&&model.styles?model.styles:{};
  this.markup=model&&model.markup?model.markup:'';
  this.src=model&&model.src?model.src:'';
  this.behaviour=model&&model.behaviour?model.behaviour:'';
  if(type==ComponentTypes.TABLE){
    this.rows=model.rows;
  }

}
  updateStyles(styles){
    this.styles=styles
  }
  styleMapper(styles){
    this.styles=styles
  }
  setSource(src){
    this.src=src;
  }
  setMarkup(markup){
    this.markup=markup;
  }
  setType(type){
    this.type=type;
  }
}

module.exports = Component;
