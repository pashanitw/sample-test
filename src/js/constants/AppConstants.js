var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'onChange',

  ActionTypes: keyMirror({
    ADD_TASK: null,
    ADD_PAGE: null,
    REMOVE_PAGE: null,
    MOVE_PAGE: null,
    TEMPLATE_SELECTED: null,
    PAGE_SWITCHED: null,
    ADD_COMPONENT: null,
    REMOVE_COMPONENT: null,
    MOVE_SELECTION_UP: null,
    MOVE_SELECTION_DOWN: null,
    RE_ARRANGE_PAGES: null,
    UPDATE_COMPONENT_MARKUP: null,
    UPDATE_ROOT: null,
    INSERT_IMAGE: null,
    UPDATE_COMPONENT_POSITION:null,
    UPDATE_PAGES:null,
    ADD_GUTTER:null,
    UPDATE_TABLE_CELL:null,
    TOGGLE_GRID:null,
    HANDLE_GUTTER:null,
    ADD_NEW_ROW_TO_TABLE:null,
    UPDATE_NESTED_COMPONENT_MARKUP:null
  }),
  ItemType: "Component",
  ComponentTypes: {
    IMAGE: "image",
    TEXT: "text",
    VIDEO: "video",
    TABLE: "table",
    NO_TYPE:"no_type",
    MULTIPLE:"multiple"
  },
  GUTTER_STYLE:{
    width:0,
    height:'100%',
    border:'3px solid black',
    left:'50%',
    top:0
  },
  Constants: keyMirror({
    LEVEL_1: null,
    LEVEL_2: null
  }),
  Labels: {
    modalHeader: "Please Select the Template"
  },
  COMPONENT: {
    "styles": {
      "width": 430,
      "height": 200,
      "left": "30%",
      "top": "30%"
    }
  },
  TEXT_MARK_UP: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",

  EPUB: {
    PACKAGE: {
      name: "package",
      path: 'EPUB/',
      ext: '.opf',
      type:"text"
    },
    CONTAINER: {
      name: "container",
      path: 'META-INF/',
      ext: '.xml',
      type:"text"
    },
    MIME: {
      name: "mimetype",
      path: '',
      ext: '',
      data: 'application/epub+zip',
      type:"text"
    }
  },
  CONTENT: {
    "name": "",
    "url": "xhtml/",
    "properties": "scripted",
    "spine": {
      "properties": {
        "layout": "layout-pre-paginated",
        "spread": "none"
      }
    },
    "type": "application/xhtml+xml"
  },
  MimeTypes :{
    ".gif":   "image/gif",
    ".jpg":   "image/jpeg",
    ".jpeg":  "image/jpeg",
    ".jpe":   "image/jpeg",
    ".png":   "image/png",
    ".svg":   "image/svg+xml",
    ".xhtm":  "application/xhtml+xml",
    ".xhtml": "application/xhtml+xml",
    ".ncx":   "application/x-dtbncx+xml",
    ".otf":   "application/vnd.ms-opentype",
    ".woff":  "application/application/font-woff",
    ".smil":  "application/smil+xml",
    ".smi":   "application/smil+xml",
    ".sml":   "application/smil+xml",
    ".pls":   "application/pls+xml",
    ".mp3":   "audio/mpeg",
    ".mp4":   "audio/mp4",
    ".aac":   "audio/mp4",
    ".m4a":   "audio/mp4",
    ".m4v":   "audio/mp4",
    ".m4b":   "audio/mp4",
    ".m4p":   "audio/mp4",
    ".m4r":   "audio/mp4",
    ".css":   "text/css",
    ".js":    "text/javascript"
  },

  KEYBOARD: {
    DEL: 'del',
    UP: 'up',
    DOWN: 'down'
  },
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
