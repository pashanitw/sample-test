/**
 * Created by space on 3/7/15.
 */
var PageModel = require('./PageModel.js');
var React = require('react/addons');
var update = React.addons.update

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
    var blankPage = new PageModel();
    this.templates.push(blankPage);
    this.lastSelected = this.pages[0];
    this.lastSelected.select();
  }

  clear() {
    this.pages = [];
    this.lastSelected = null;
  }

  switch(page) {
    var self = this;
    this.lastSelected.unselect();
    page.select();
    var pages = update(this.pages, {
      $splice: [[page.index, 1, page]]
    });
    var collection = update(self, {
      lastSelected: {$set: page},
      pages: {$set: pages}
    });
    return collection;
  }

  pageComparator() {
    console.log("slide added");
  }
  pagesReorganized() {

  }

  addPage(item) {

    var self = this;
    var model = new PageModel(item);
    this.lastSelected.unselect();
    $splice:[[this.lastSelected.index, 1, this.lastSelected]]
    var collection;
    var currentPage = this.getCurrentPage();
    if (currentPage.index == this.pages.length - 1) {
      collection = update(self, {
        pages: {
          $push: [model]
        }

      });
    } else {
      collection = update(self, {
        pages: {
          $splice: [[currentPage.index, 0, model]]
        }

      });
    }
   this.pages=collection.pages;
   this.updateIndexes();
    return this.switch(model);

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

  getLength() {
    return this.pages.length;
  }

  changeSelection(index) {
    return this.switch(this.pages[index]);
  }

  getSelectedPage() {
    return this.lastSelected;
  }

  addComponent(type, data) {
    var self=this;
     this.lastSelected=this.lastSelected.addComponent(type, data);
    var pages = update(this.pages, {
      $splice: [[this.lastSelected.index, 1, this.lastSelected]]
    });
    var pageCollection = update(self, {
      pages: {
        $set: pages
      }
    });
    return pageCollection;
  }
  addGutter(){
    var self=this;
    this.lastSelected=this.lastSelected.addGutter();
    var pages = update(this.pages, {
      $splice: [[this.lastSelected.index, 1, this.lastSelected]]
    });
    var pageCollection = update(self, {
      pages: {
        $set: pages
      }
    });
    return pageCollection;
  }
  removeGutter(){
    this.lastSelected=this.lastSelected.removeGutter()
  }
  removeComponent(id) {
    this.lastSelected.removeComponent(id);
  }

  updateIndexes() {
    this.pages.forEach((page, index)=> {
      page.index = index;
      console.log(page.index);
    })
  }

  removePage(id) {
    this.pages.some((page, index)=> {
      if (page._id == id) {
        this.pages.splice(index, 1);
        if (this.pages.length) {
          var nextIndex = index
          if ((nextIndex + 1) >= this.pages.length) {
            nextIndex -= 1;
          }
          if (nextIndex < 0) {
            nextIndex = 0;
          }
          console.log("switch number", Math.abs(nextIndex))
          this.updateIndexes();
          this.switch(this.pages[Math.abs(nextIndex)])
        } else {
          this.clear();
        }
        return true;
      }
    })
  }

  reArrangePages(location) {
    var pages = [];
    this.pages.forEach((item, index)=> {
      if (index == location.source) {
        var page = this.pages[location.destination];
        page.index = index;
        pages.push(page)
      } else if (index == location.destination) {
        var page = this.pages[location.source];
        page.index = index;
        pages.push(page)
      } else {
        pages.push(item);
      }
    });
    this.pages = pages;
  }

  getCurrentPage() {
    return this.lastSelected;
  }

  updateCurrentPage(page) {
    this.pages[page.index] = page;
    this.lastSelected = page;
  }

  updateComponentPosition(index, position) {
    var self = this;
    this.lastSelected = this.lastSelected.updateComponentPosition(index, position);
    var pages = update(this.pages, {
      $splice: [[this.lastSelected.index, 1, this.lastSelected]]
    });
    var pageCollection = update(self, {
      pages: {
        $set: pages
      }
    });
    return pageCollection;
  }

  updateComponentMarkup(index, html) {
    var self = this;
    this.lastSelected = this.lastSelected.updateComponentMarkup(index, html);
    var pages = update(this.pages, {
      $splice: [[this.lastSelected.index, 1, this.lastSelected]]
    });
    var pageCollection = update(self, {
      pages: {
        $set: pages
      }
    });
    return pageCollection;
  }

  updatePages(pages) {
    var self = this;
    var pageCollection = update(self, {
      pages: {
        $set: pages
      }
    });
    return pageCollection;
  }
}


module.exports = PageCollection;
