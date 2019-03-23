//  套件定義
//  在package.json內引用的套件

const gulp = require('gulp');
// const path = require('path');   //用來定義路徑
const gulpSass = require('gulp-sass');

//  定義工作 / function (cb = callback function)

//  ============================================================
//          工作 1 建構SASS Compiler
//  ============================================================


const buildSass = function(cb){
    gulp.src('./src/styles/index.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('build/'));
    cb();
}

exports.default = buildSass;