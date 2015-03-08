/**
 * Created by space on 3/7/15.
 */

var PageModel=function(){
  this.id='';
    this.name='';
    this.components='';
};

PageModel.prototype.print=function(){
  console.log("slide added")
};

module.exports=PageModel;
