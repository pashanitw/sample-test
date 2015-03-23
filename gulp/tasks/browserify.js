var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var config = require('../config').browserify;
var gulp_browserify = require('gulp-browserify');
var reactify = require('reactify');
var rename = require('gulp-rename');


var bundler = watchify(browserify(config.src, {debug:true}));
config.settings.transform.forEach(function(t) {
  bundler.transform(t);
});

gulp.task('browserify', bundle);
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(gulp.dest(config.dest))
  .pipe(connect.reload());
}
gulp.task('bundleLibs', function() {
  //single entry point to browserify
  gulp.src(['src/js/index.jsx'])
    .pipe(gulp_browserify({
      transform: ['reactify','babelify'],
      debug:true
      shim: {
        jquery: {
          path: 'bower_components/jquery/dist/jquery.js',
          exports: 'jquery'
        }
      }
    }))
    .pipe(rename('index.js'))

    .pipe(gulp.dest('./dist/js'))
});
