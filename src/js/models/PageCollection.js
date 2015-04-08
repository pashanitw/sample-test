/**
 * Created by space on 3/7/15.
 */
var PageModel = require('./PageModel.js');
class PageCollection {
  constructor(template) {
    this.pages = [];
    this.templates = [];
    this.title = 'Default';
    this.lastSelected = null;
    if (template) {
      this._init(template);
    }

  }

  _init(template) {
    this.name = template.name;
    this.pages = template.pages.map(function (item, index) {
      item.index = index;
      var model = new PageModel(item);
      return model;
    });
    this.config = template.config;
    this.templates = template.templates;
    this.lastSelected = this.pages[0];
    this.lastSelected.select();
  }

  switch(page) {
    this.lastSelected.unselect();
    this.lastSelected = page;
    this.lastSelected.select();
  }

  pageComparator() {
    console.log("slide added");
  }

  updateIndexes() {

  }

  pagesReorganized() {

  }

  addPage(item) {
    item.index = this.pages.length;
    item.name = item.type + "-" + item.index;
    var model = new PageModel(item);
    this.pages.push(model);
  }

  removeWithIndex(index) {

  }

  copyWithIndex(index, page) {
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
  }

  getSelectedPage() {
    return this.lastSelected;
  }
  addComponent(){
    this.lastSelected.addComponent();
  }
  removeComponent(id){
    this.lastSelected.removeComponent(id);
  }
  removePage(id){
    this.pages.some((page,index)=>{
      if(page._id==id){
        this.pages.splice(index,1);
        if(this.pages.length){
          this.switch(this.pages[Math.abs(index-1)])
        }
        return true;
      }
    })
  }
}


module.exports = PageCollection;
