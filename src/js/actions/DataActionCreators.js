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
  getAllCategories(){
    var url="categories";
    $.get(Constants.BASE_API_URL+url).then(function(categories){
      utils.stopProgress();
      AppDispatcher.handleViewAction({
        type:Constants.ActionTypes.GET_ALL_CATEGORIES,
        categories:categories
      })
    })

  },
  fetchCategoryByName(type){
    var _prefix="categories/";
    $.get(Constants.BASE_API_URL+_prefix+type).then(function(response){
      utils.stopProgress();
      AppDispatcher.handleViewAction({
        type:Constants.ActionTypes.FETCH_CATEGORY_BY_NAME,
        response:response
      })
    })
  }

};
