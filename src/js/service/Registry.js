const TextComponent = require('../components/TextComponent.jsx');
const ImageComponent = require('../components/ImageComponent.jsx');
const VideoComponent = require('../components/VideoComponent.jsx');
const TableComponent = require('../components/TableComponent.jsx');
var Constants = require('../constants/AppConstants');
var React = require('react/addons');
var assign = require('object-assign');
var childStyle = {
  width: '100%',
  height: '100%'
};
var ComponentTypes = Constants.ComponentTypes;
var componentRegistry = function (props,isEditable,isNested,parentProps) {
  var component;
  switch (props.type) {
    case ComponentTypes.TEXT:
      component = <TextComponent {...props}
        childStyle={childStyle}
        isEditable={isEditable}
        isNested={isNested}
        parentProps={parentProps}></TextComponent>;
      break;
    case ComponentTypes.IMAGE:
      component = <ImageComponent {...props} childStyle={childStyle}></ImageComponent>;
      break;
    case ComponentTypes.VIDEO:
      component = <VideoComponent {...props} childStyle={childStyle}></VideoComponent>;
      break;
    case ComponentTypes.TABLE:
      component = <TableComponent {...props} childStyle={childStyle}></TableComponent>;
      break;
    case ComponentTypes.MULTIPLE:
      var components=[];
      props.components.forEach(function(item,index){
        var editable=false;
            var isNested=true;
        if(item.type==ComponentTypes.TEXT){
          editable=true;
        }
        var nestProps=assign({},item,{index:index});
        components.push(<div style={item.styles} className={item.classes.join(' ')}>{componentRegistry(nestProps,editable,isNested, props)}</div>);
      });
      return components;
      break;
  }
  return component;
};
module.exports = componentRegistry;
