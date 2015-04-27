const TextComponent = require('../components/TextComponent.jsx');
const ImageComponent = require('../components/ImageComponent.jsx');
const VideoComponent = require('../components/VideoComponent.jsx');
const TableComponent = require('../components/TableComponent.jsx');
var Constants = require('../constants/AppConstants');
var React = require('react/addons');

var ComponentTypes = Constants.ComponentTypes;
var cacheRegistry = function () {
  var _registry={
   css:[]
  };

  return {
    clearCache:function(){
    _registry.css.forEach(function(id){
      $("#"+id).prop('disabled', true);
      $("#"+id).remove();
    });
      _registry.css=[];
    },
    registerComponent:function(id,type){
      switch (type){
        case Constants.MimeTypes.CSS:
              _registry.css.push(id);
              break;
      }
    }
  }
};
module.exports = cacheRegistry();
