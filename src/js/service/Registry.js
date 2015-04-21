const TextComponent = require('../components/TextComponent.jsx');
const ImageComponent = require('../components/ImageComponent.jsx');
const VideoComponent = require('../components/VideoComponent.jsx');
const TableComponent = require('../components/TableComponent.jsx');
var Constants = require('../constants/AppConstants');
var React = require('react/addons');
var childStyle = {
  width: '100%',
  height: '100%'
};
var ComponentTypes = Constants.ComponentTypes;
var componentRegistry = function (props,isEditable) {
  var component;
  switch (props.type) {
    case ComponentTypes.TEXT:
      component = <TextComponent {...props} childStyle={childStyle} isEditable={isEditable}></TextComponent>;
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
  }
  return component;
};
module.exports = componentRegistry;
