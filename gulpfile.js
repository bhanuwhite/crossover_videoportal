/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*--  Variables  --*/
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var child = require('child_process');
var fs = require('fs');

/*-- Stream Task  --*/
gulp.task('stream', function () {
    gulp.src(['client/sass/custom.scss'])
            .pipe(sass({errLogToConsole: true}))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./client/styles'))
            .pipe(minifyCSS())
            .pipe(concat('style.min.css'))
            .pipe(gulp.dest('./client/styles'));
});

/*--  Watch Task  --*/
gulp.task('watch', function () {
    watch('client/sass/*.scss', function () {
        gulp.start('stream');
    });
});

gulp.task('default',['watch']);
