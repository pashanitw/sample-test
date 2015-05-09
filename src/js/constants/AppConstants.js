var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'onChange',

  ActionTypes: keyMirror({
    GET_ALL_CATEGORIES:null
  }),
  //BASE_API_URL:"http://localhost:8080/",
  BASE_API_URL:"http://104.199.181.197:8080/",
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null,
    FETCH_CATEGORY_BY_NAME:null
  })
};
