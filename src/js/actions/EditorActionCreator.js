var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addItem: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },
addPage(template){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.ADD_PAGE,
    template:template
  })
},
  addComponent(type,data){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.ADD_COMPONENT,
    componentType:type,
    data:data
  })
},
  removeComponent(id){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.REMOVE_COMPONENT,
    id:id
  })
},
  removePage(id){
  AppDispatcher.handleViewAction({
    type:Constants.ActionTypes.REMOVE_PAGE,
    id:id
  })
},
  moveSelectionUp(index){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.MOVE_SELECTION_UP,
      index:index
    })
  },
  moveSelectionDown(index){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.MOVE_SELECTION_DOWN,
      index:index
    })
  },
  selectTemplate(template){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.TEMPLATE_SELECTED,
      template:template
    })
  },
  pageSwitched(page){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.PAGE_SWITCHED,
      page:page
    })
  },
  reArrangePages(source,destination){
    if(source==destination){
      return;
    }
    var locationOb={
      source:source,
      destination:destination
    }
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.RE_ARRANGE_PAGES,
      locationOb:locationOb
    })
  },
  updateComponentMarkup(index,html){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.UPDATE_COMPONENT_MARKUP,
        data:{
          index:index,
          html:html
        }
    })
  },
  updateRoot(){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.UPDATE_ROOT
    })
  },
  updateComponentPosition(index,position){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.UPDATE_COMPONENT_POSITION,
      position:position,
      index:index
    })
  },
  updatePages(pages){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.UPDATE_PAGES,
      pages:pages
    })
  },
  addGutter(){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.ADD_GUTTER
    })
  },
  toggleGrid(){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.TOGGLE_GRID
    })
  },
  handleGutter(value){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.HANDLE_GUTTER,
      value:value
    })
  },
  clearList: function() {
    console.warn('clearList action not yet implemented...');
  },
  updateTableCell(index,rowIndex,columnIndex, html){
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.UPDATE_TABLE_CELL,
      index:index,
      rowIndex:rowIndex,
      columnIndex:columnIndex,
      html:html
    })
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  }

};
