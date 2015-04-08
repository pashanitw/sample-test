/**
 * Created by ghousepashas on 08-04-2015.
 */
var Mousetrap=require('mousetrap');

var MousetrapMixin={
  bindShortcut:function(key,callback){
    var bindings = this.constructor.mousetrapBindings;

    var object={
      key:key,
      callback:callback
    };

bindings.push(object);
  },
  componentDidMount(){
    var bindings = this.constructor.mousetrapBindings;
    var CustomMousetrap;
    var element = this.getDOMNode();
    CustomMousetrap = new Mousetrap(element);
    var that = this;
    bindings.forEach(function (item, index) {
      if (item.ref) {
        var mstrap = new Mousetrap(that.refs[item.ref].getDOMNode());
        mstrap.bind(item.key, that[item.callback]);
      } else {
        CustomMousetrap.bind(item.key, that[item.callback]);
      }
    });
  },
  componentWillUnmount(){
/*    this.mousetrapBindings.forEach(function(item){
      CustomMousetrap.unbind(item.key);
    })*/
  }
};
module.exports=MousetrapMixin;

