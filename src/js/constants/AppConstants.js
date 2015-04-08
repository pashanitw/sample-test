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
    ADD_COMPONENT:null,
    REMOVE_COMPONENT:null,
    MOVE_SELECTION_UP:null,
    MOVE_SELECTION_DOWN:null
  }),
  Constants: keyMirror({
    LEVEL_1: null,
    LEVEL_2: null
  }),
  Labels:{
    modalHeader:"Please Select the Template"
  },
  COMPONENT:{
    "type": "text",
    "styles": {
      "width": 430,
      "height": 200,
      "left": "50%",
      "top": "50%"
    },
    "markup": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>"
  },
  EPUB:{
    PACKAGE:{
      name:"package",
      path:'EPUB/',
      ext:'.opf'
    },
    CONTAINER:{
      name:"container",
      path:'META-INF/',
      ext:'.xml'
    },
    MIME:{
      name:"mimetype",
      path:'',
      ext:'',
      data:'application/epub+zip'
    }
  },
  CONTENT: {
    "name":"",
    "url":"xhtml/",
    "properties":"scripted",
    "spine":{
      "properties":{
        "layout":"layout-pre-paginated",
        "spread":"none"
      }
    },
    "type":"application/xhtml+xml"
  },
  KEYBOARD:{
    DEL:'del',
    UP:'up',
    Down:'down'
  },
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
