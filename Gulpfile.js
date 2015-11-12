var packageInfo = require('./package.json');
var taskList = [{name:'default'},{name:'delete'},{name:'build'},{name:'copy'},{name:'minify'}];

var gulpTalk2me = require('gulp-talk2me');
var talk2me = new gulpTalk2me(packageInfo,taskList);
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var uglify = require('gulp-uglify');

console.log(talk2me.greeting);

gulp.task('default',function(callback){
   runSequence('build',callback);
});

gulp.task('delete',function(callback){
   del('dist/**/*', callback());
});

gulp.task('build',function(callback){
  runSequence('delete',['copy','minify'],callback);
});

gulp.task('copy',function(){
  return gulp.src(['src/**/*.js','!src/**/*.spec.js'])
  .pipe(sourcemaps.init())
  .pipe(ngAnnotate({
      add: true
    }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'));
});

gulp.task('minify',function(){
  return gulp.src(['src/**/*.js','!src/**/*.spec.js'])
    .pipe(sourcemaps.init())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});