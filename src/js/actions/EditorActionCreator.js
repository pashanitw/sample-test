var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addItem: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },
addPage:function(page){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.ADD_PAGE,
    page:page
  })
},
  selectTemplate:function(template){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.TEMPLATE_SELECTED,
      template:template
    })
  },
  clearList: function() {
    console.warn('clearList action not yet implemented...');
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  }

};
