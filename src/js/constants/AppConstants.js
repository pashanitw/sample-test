var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'onChange',

  ActionTypes: keyMirror({
    ADD_TASK: null,
    ADD_PAGE: null,
    REMOVE_PAGE: null,
    MOVE_PAGE: null,
    TEMPLATE_SELECTED: null,
    PAGE_SWITCHED: null
  }),
  Constants: keyMirror({
    LEVEL_1: null,
    LEVEL_2: null
  }),
  Labels:{
    modalHeader:"Please Select the Template"
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
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
