/**
 * Created by space on 3/7/15.
 */
var utils = require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Component=require('./Component.js');
var Constants = require('../constants/AppConstants');
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
    this.selected = true;
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
  addComponent(){
   var component=new Component(Constants.COMPONENT);
    this.components.push(component);
  }
  removeComponent(id){
    this.components.some((component,index)=>{
      if(component._id==id){
        this.components.splice(index,1);
        return true;
      }
    })
  }
}

module.exports = PageModel;
