var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');

gulp.task('build', ['browserify', 'moveMaterializeFonts','styles','moveck','move-templates','move-config'], function() {
 // gulp.src(config.src).pipe(connect.reload());
});

var ghPages = require('gulp-gh-pages');
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

var handlebars = require('Handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var tap=require('gulp-tap');
var path = require('path');
var gutil = require('gulp-util');
var minify = require('html-minifier').minify;

gulp.task('templates', function(){
  gulp.src('./src/**/*.bars',{base: 'src/'})
   // .pipe(handlebars.compile())
  .pipe(makeChange())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
    //.pipe(handlebars.compile())
    //.pipe(concat('templates.js'))
    //.pipe(gulp.dest('dist/js/'))
/*    .pipe(tap(function(file, t) {
      console.log(path.basename(file.path));
      console.log(handlebars.compile(file));*/
     //var template= handlebars.compile(source);
      /*if (path.extname(file.path) === '.coffee') {
        return t.through(coffee, []);
      }*/
   // }))
    /*.pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));*/
});

function makeChange(something) {
  console.log("somethng",something)
  // you're going to receive Vinyl files as chunks
  var index=0;
  function transform(file, cb) {
var relativePath=path.relative(String(__dirname),String(file.path));

   var fileName= relativePath.replace(/^(\.{2}[\/\\]\.{2}[\/\\])(.+)?\.bars$/,function(total,$1,$2){return $2;})
   fileName=fileName.replace(/\\/g,function(total,$1){
     return '/';
   });
    console.log("file name is",fileName);

   // var template=handlebars.compile(String(file.contents));
    console.log(minify(file.contents.toString()));
    console.log(fileName);
    var content='';
    if(index==0){
     content+= 'function JSTContext() { \n window.templateCollection=window.templateCollection||{};\n';
     content+= 'window.JST=window.JST||{};\n';

      ++index;
    }
    content+='window.templateCollection["'+fileName+'"]=\''+String(file.contents).trim()+'\';\n';
    content+='handlebars.registerPartial("'+path.basename(file.path).slice(0, -5)+'",'+'window.templateCollection["'+fileName+'"]'+');\n';
    content+="window.JST['"+fileName+"']=handlebars.compile("+'window.templateCollection["'+fileName+'"]'+");\n";
  //  console.log(String(file.contents));
    file.contents = new Buffer(content);

    // if there was some error, just pass as the first parameter here
    cb(null, file);
  }

  // returning the map will cause your transform function to be called
  // for each one of the chunks (files) you receive. And when this stream
  // receives a 'end' signal, it will end as well.
  //
  // Additionally, you want to require the `event-stream` somewhere else.
  return require('event-stream').map(transform);
}
gulp.task('moveck', function(){
  gulp.src('./src/libs/**/*.*',{base: 'src/'})
    .pipe(gulp.dest('dist/'));
});
gulp.task('move-config', function(){
  gulp.src('./src/config.json',{base: 'src/'})
    .pipe(gulp.dest('dist/'));
});
gulp.task('move-templates', function(){
  gulp.src('./src/templates/**/*.*',{base: 'src/'})
    .pipe(gulp.dest('dist/'));
});

gulp.task('moveMaterializeFonts', function(){
  gulp.src('./bower_components/materialize/font/**/*.*')
    .pipe(gulp.dest('dist/font'));
});
gulp.task('moveMyriaFonts', function(){
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('dist/font'));
});
