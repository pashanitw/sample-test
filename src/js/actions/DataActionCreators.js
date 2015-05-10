var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var utils=require('../utils/utils.js');
module.exports = {


  clearList: function() {
    console.warn('clearList action not yet implemented...');
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  },
  transition(Handler,params){
var url=Constants.BASE_API_URL+params.path;

    $.get(url).then(function(response){
      AppDispatcher.handleViewAction({
        type:Constants.ActionTypes.TRANSITION,
        response:response
      })
      utils.stopProgress();
    })
  }


};
