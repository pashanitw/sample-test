/**
 * Created by space on 3/7/15.
 */
var utils = require('../utils/utils.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Component = require('./Component.js');
var Constants = require('../constants/AppConstants');
var React = require('react/addons');
var ComponentTypes=Constants.ComponentTypes;
var update = React.addons.update;
class PageModel {

  constructor(model) {
    this.components = [];
    if (model) {
      this._id = model.id || utils.getUniqueId();
      this.name = "Page-"+this._id;
      this.components = model.components ? model.components.map(function (item, index) {
        return new Component(item.type,item);
      }) : [];
      this.index = model.index;
        this.selected = false;
    }
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

  }

  updateComponent(data) {

  }

  addComponent(type,data) {
    /*var component = new Component(Constants.COMPONENT);
    this.components.push(component);
    */
    var self=this;
    var component=new Component(type,Constants.COMPONENT);
    switch(type){
      case ComponentTypes.TEXT:
            component.setMarkup(Constants.TEXT_MARK_UP);
            break;
      case ComponentTypes.IMAGE:
            if(data.source){
              component.setSource(data.source)
            }else{
              throw "Please set the source for the image";
            }
            break;
    }
    var components=update(this.components,{$push:[component]});
    var page= update(self, {
      components: {
        $set:components
      }
    });
    return page;
  }
  addGutter(){
    var gutterStyles=update({},{$set:Constants.GUTTER_STYLE})
    var component=new Component(Constants.ComponentTypes.text,gutterStyles);
    return addComponent()
  }

  removeComponent(id) {
    this.components.some((component, index)=> {
      if (component._id == id) {
        this.components.splice(index, 1);
        return true;
      }
    })
  }

  updateComponentMarkup(index, html) {
    var self = this;
    var component=update(this.components[index], {
     $merge:{
       markup:html
     }
    }
    );
    var components=update(this.components,{
      $splice:[[index,1,component]]
    });
    var page= update(self, {
      components: {
        $set:components
      }
    });
    return page;
  }
  updateComponentPosition(index,position){
    var self=this;
   var component= update(this.components[index],{
      styles:{$merge:position}
    });
    var components=update(this.components,{
      $splice:[[index,1,component]]
    });
    var page= update(self, {
      components: {
        $set:components
      }
    });
    return page;
  }
}

module.exports = PageModel;
