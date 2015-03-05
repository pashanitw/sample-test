var React = require('react'),
    App = require('./components/App.jsx'),
    JST=require('JST');
console.log("jst is",JST);


React.render(<App />, document.getElementById('main'));
