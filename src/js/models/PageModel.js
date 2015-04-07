/**
 * Created by space on 3/7/15.
 */
var utils = require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Component=require('./Component.js');
class PageModel {

  constructor(model) {
    this._id = model.id || utils.getUniqueId();
    this.name = model.name;
    this.components = model.components?model.components.map(function(item,index){
      return new Component(item);
    }):[];
    this.index = model.index,
      this.selected = false
  }

  select() {
    this.selected = false;
  }

  unselect() {
    this.selected = false;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

  switch(page) {
    EditorActionCreator.pageSwitched(page)
  }
}

module.exports = PageModel;
