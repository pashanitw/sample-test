/**
 * Created by space on 3/7/15.
 */
  var utils=require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');


var PageModel = function (model) {
  this._id = model.id ||utils.getUniqueId();
  this.name = model.name;
  this.components = model.components || [];
  this.index = model.index,
    this.selected = false
};

PageModel.prototype.select = function () {
  this.selected = true;
};
PageModel.prototype.unselect = function () {
  this.selected = false;
};

PageModel.prototype.getIndex = function () {
  return this.index;
};
PageModel.prototype.setIndex = function (index) {
  this.index = index;
};
PageModel.prototype.switch = function (page) {
  EditorActionCreator.pageSwitched(page)
}

module.exports = PageModel;
