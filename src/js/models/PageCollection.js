/**
 * Created by space on 3/7/15.
 */
var PageModel=require('./PageModel.js');
var PageCollection = function (template) {
  this.pages = [];
  this.templates=[];
  this.title = 'Default';
  this.lastSelected = null;
  if (template) {
    this._init(template);
  }

};
PageCollection.prototype._init = function (template) {
  this.name = template.name;
  this.pages = template.pages.map(function(item,index){
    item.index=index;
    var model=new PageModel(item);
    return model;
  });
  this.config=template.config;
  this.templates=template.templates;
  this.lastSelected = this.pages[0];
  this.lastSelected.select();
};
PageCollection.prototype.switch = function (page) {
  this.lastSelected.unselect();
  this.lastSelected = page;
  this.lastSelected.select();
}
PageCollection.prototype.pageComparator = function () {
  console.log("slide added");
};
PageCollection.prototype.updateIndexes = function () {

};
PageCollection.prototype.pagesReorganized = function () {

};
PageCollection.prototype.addPage = function (item) {
  item.index=this.pages.length;
  item.name=item.type+"-"+item.index;
  var model=new PageModel(item);
  this.pages.push(model);
};
PageCollection.prototype.removeWithIndex = function (index) {

};
PageCollection.prototype.copyWithIndex = function (index, page) {
  if (index == 0) {
    this.pages.shift(page);
  } else if (index == this.pages.length) {
    this.pages.push(page);
  } else {
    var start = 0;
    var pages = [];
    while (start != index) {
      pages.push(this.pages[start]);
      start++;
    }
    pages.push(page);
    while (start != this.pages.length) {
      pages.push(this.pages[start]);
      start++;
    }
    return pages;
  }
};
PageCollection.prototype.getSelectedPage=function(){
  return this.lastSelected;
}
module.exports = PageCollection;
