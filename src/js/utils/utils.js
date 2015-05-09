/**
 * Created by ghousepashas on 27-03-2015.
 */
  var Spinner=require('spin');
window.Spinner=new Spinner();
var c=1;
var utils= {
  getUniqueId(){

    var d = new Date(),
      m = d.getMilliseconds() + "",
      u = ++d + m + (++c === 10000 ? (c = 1) : c);

    return u;

},
  showProgress(){
    var target = document.getElementById('spinner');
    $(target).css('display',"block");
    window.Spinner.spin(target);
  },
  stopProgress(){
    var target = document.getElementById('spinner');
    window.Spinner.stop();
    $(target).css('display',"none");

  }
}
module.exports=utils;
