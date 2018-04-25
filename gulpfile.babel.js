'use strict';

// var gulp = require('gulp');
import gulp from 'gulp' // ES6 
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  });

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))

    .on('error', function (err) {
      console.error(err.toString());
    })
    .pipe(useref())
    .pipe(gulp.dest('dist'));
  });

gulp.task('watch', ['browserSync', 'sass'], function (){
 gulp.watch('app/scss/**/*.scss', ['sass']);
 gulp.watch('app/*.html', browserSync.reload);
 gulp.watch('app/js/**/*.js', browserSync.reload);
})