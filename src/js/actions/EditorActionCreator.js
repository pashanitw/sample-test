var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addItem: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },
addPage:function(template){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.ADD_PAGE,
    template:template
  })
},
  selectTemplate:function(template){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.TEMPLATE_SELECTED,
      template:template
    })
  },
  pageSwitched:function(page){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.PAGE_SWITCHED,
      page:page
    })
  },
  clearList: function() {
    console.warn('clearList action not yet implemented...');
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  }

};
