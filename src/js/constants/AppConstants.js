var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_TASK: null,
    ADD_PAGE: null,
    REMOVE_PAGE:null,
    MOVE_PAGE:null,
    TEMPLATE_SELECTED:null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
