var React=require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var PageModel = require('../models/PageModel.js');
var EditorActionCreator = require('../actions/EditorActionCreator.js');
var Snapshot = require('./Snapshot.jsx')
require('react/addons');
var EditorStore = require('../stores/EditorStore.js');
var EPUB = require('../constants/AppConstants.js').EPUB;
var ContentModel = require('../constants/AppConstants.js').CONTENT;
var Handlebars = require('Handlebars');
var assign = require('object-assign');




Handlebars.registerHelper('spine', function (items, options) {
  var out = "<spine>\n";

  for (var i = 0, l = items.length; i < l; i++) {
    out = out + "<itemref idref=\"page-" + i + "\" " + options.fn(items[i].spine) + "/>\n";
  }
  return out + "</spine>";

});
Handlebars.registerHelper('table', function (rows, options) {
  var out = "<table>\n";

  for (var i = 0, l = items.length; i < l; i++) {
    out = out + "<itemref idref=\"page-" + i + "\" " + options.fn(items[i].spine) + "/>\n";
  }
  return out + "</spine>";

});
Handlebars.registerHelper('renderStyles', function () {
  function getStyles(style, name) {
    if (style) {
      style+='';
      return name + ":" + (style.match(/(.*?)%$/) ? style : style + "px") + ";";
    }
return '';

  }
var position=this.styles.position?("position:"+this.styles.position+";"):'';
  return getStyles(this.styles.width, 'width') +
    getStyles(this.styles.height, 'height') +
    getStyles(this.styles.top, 'top') +
    getStyles(this.styles.left, 'left')+
    position+
    (this.styles.backgroundImage?(";background-image:"+this.styles.backgroundImage+";"):'');
});
Handlebars.registerHelper('renderClasses', function () {
if(this.classes){
  return "class = "+"\""+this.classes.join(' ')+"\"";
}
  return '';
});
Handlebars.registerHelper('renderMultipleComponent', function () {
  var source = $("#component-template").html();
  var componentTemplate = Handlebars.compile(source);
  var result='';
  if(this.components){
  this.components.forEach(function(item,index){
    result+=componentTemplate(item);
  })
}
  return result;
});

Handlebars.registerHelper("ifcond", function(conditional, options) {
  if (options.hash.desired === options.hash.type) {
    if(options.hash.type=="table"){
      debugger;0
    }
    return options.fn(this);
  }
  return '';
});

var AddPageButton = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState: function () {
    return {};
  },
  statics:{
    show:function(){
      console.log("in show method",this);
    }
  },
  componentWillMount: function () {

  },
  render: function () {
    var style = {
      display: 'inline-block',
      position: 'relative'
    };
    var cx = React.addons.classSet;
    return (
      <li>
        <a onClick={this.exportEpub}>Export</a>
      </li>
    );
  },
  exportEpub: function () {
    var pages = [];
    var state = EditorStore.getState();
    var pageCollection = state.pageCollection;
    var source = $("#page-template").html();
    var pageTemplate = Handlebars.compile(source);
    source = $("#container-template").html();
    var containerTemplate = Handlebars.compile(source);
    source = $("#package-template").html();
    var packageTemplate = Handlebars.compile(source);
    source = $("#toc-template").html();
    var tocTemplate = Handlebars.compile(source);
    pageCollection.config.contents = this.updateConfig(pageCollection.config, pageCollection.pages);

    pageCollection.pages.forEach(function (item) {
      var ob = {
        name: item.name,
        path: 'EPUB/xhtml/',
        ext: '.html',
        data: pageTemplate(item).trim(),
        type:"text"
      }
      pages.push(ob);
    });

    EPUB.PACKAGE.data = packageTemplate(pageCollection.config).trim();
    var toc = tocTemplate(pageCollection.config).trim();
    var ob = {
      name: "toc",
      path: 'EPUB/',
      ext: '.xhtml',
      data: toc,
      type:"text"
    }
    pages.push(ob);
    EPUB.CONTAINER.data = containerTemplate().trim();
    pages.push(EPUB.PACKAGE);

    pages.push(EPUB.CONTAINER);
    pages.push(EPUB.MIME);
   // images here
    pageCollection.config.images.forEach(function (item) {
      var ob = {
        path: "EPUB/" + item.url,
        ext: '.jpg',
        url: pageCollection.config.path + item.url,
        type:"file"
      }
      pages.push(ob);
    });
    pageCollection.config.stylesheets.forEach(function (item) {
      var ob = {
        path:"EPUB/"+item.url,
        ext: '.css',
        url: pageCollection.config.path + item.url,
        type:"file"
      }
      pages.push(ob);
    });



    this.packageEpub(pages);
  },
  updateConfig(config, pages) {
    return pages.map((item, index)=> {
      var model = assign({}, ContentModel);
      model.name = item.name + ".html";
      model.url += model.name;
      model.type="text/html";
      return model;
    })
  },
  packageEpub(pages) {
    this.getFile(pages);
  },
  getFile(pages) {
    var that = this;
    var deferred = $.Deferred();
    zip.createWriter(new zip.BlobWriter(), function (writer) {

      // use a TextReader to read the String to add
      that.helper.call(this, writer, pages, function () {
        closeWriter();
      }, 0);

      function closeWriter() {
        writer.close(function (blob) {
          debugger;
          URL = window.webkitURL || window.mozURL || window.URL;
          var blobUrl = URL.createObjectURL(blob);
          var clickEvent;
          clickEvent = document.createEvent("MouseEvent");
          clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          var downloadButton = document.createElement('a')
          downloadButton.href = blobUrl;
          downloadButton.download = "test.zip";
          downloadButton.dispatchEvent(clickEvent);
          //   creationMethodInput.disabled = false;
          // fileList.innerHTML = "";
          // blob contains the zip file as a Blob object

        });
      }

    }, function (error) {
      console.log(error)
      // onerror callback
    });

    return deferred.promise();
  },
  helper(writer, pages, callback, index) {
    var that = this;
    var page = pages[index];
    var name,reader;
    if(page.type=="text"){
      name=page.path + page.name + page.ext;
      reader=new zip.TextReader(pages[index].data)
    }else if(page.type=="file"){
      name=page.path;
      reader=new zip.HttpReader(page.url)
    }
    writer.add(name, reader, function () {
      index++;
      if (index == pages.length) {
        callback();
      } else {
        that.helper(writer, pages, callback, index);
      }
    }, function (currentIndex, totalIndex) {

    });
  },
  componentDidMount: function () {

  },
  addPage: function () {

  }
});

module.exports = AddPageButton;
