var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').watch;

gulp.task('build', ['browserify', 'styles', 'html'], function() {
  gulp.src(config.src).pipe(connect.reload());
});

var ghPages = require('gulp-gh-pages');
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
