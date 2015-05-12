var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var nib = require('nib');

gulp.task('process-stylus', function() {
  return gulp
    .src('public/css/style.styl')
    .pipe(plug.stylus({ use: nib(), compress: false }))
    .pipe(gulp.dest('public/css/build'));
});

gulp.task('hint', function() {
  return gulp
    .src(['public/cafes/**/*.js'])
    .pipe(plug.jshint('./.jshintrc'))
    .pipe(plug.jshint.reporter('jshint-stylish'));
});
