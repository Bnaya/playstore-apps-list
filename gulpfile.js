var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
require('require-dir')('./gulp');

gulp.task('default', ['babel'], function () {
});
