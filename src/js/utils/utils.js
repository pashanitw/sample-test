/**
 * Created by ghousepashas on 27-03-2015.
 */
var c=1;
var utils= {
  getUniqueId:function(){

    var d = new Date(),
      m = d.getMilliseconds() + "",
      u = ++d + m + (++c === 10000 ? (c = 1) : c);

    return u;

}
}
module.exports=utils;
