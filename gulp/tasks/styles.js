var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var config = require('../config.js').sass;
var sassTemp = require('../config.js').sassTemplates;
var rename=require('gulp-rename');

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});

gulp.task('template-styles', function() {
  gulp.src(sassTemp.src)
    .pipe(sass(sassTemp.settings))
  .pipe(rename(function(path){
      var getpath=path.dirname.match(/^(.*?)[\/\\]sass$/)
      path.dirname='./src/templates/'+getpath[1]+"/css";
    console.log("path is",path);
  }))
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});
