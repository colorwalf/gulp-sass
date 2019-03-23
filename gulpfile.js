//  套件定義
//  在package.json內引用的套件

const gulp = require('gulp');
const path = require('path');
const gulpSass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

//  定義常數 / 變數

const srcRoot = path.join(__dirname, 'src/');
const buildRoot = path.join(__dirname, 'build/');

const processors = [                                 // 定義 postCSS 所需要的元件
    autoprefixer({browsers: ['last 5 version']})   // 使用 autoprefixer，這邊定義最新的五個版本瀏覽器
];

//  定義工作 / function (cb = callback function

//  ============================================================
//          工作 1 建構SASS Compiler
//  ============================================================


const buildSass = function(cb){
    console.log('build Sass to CSS');
    gulp.src(path.join(srcRoot, 'styles/**/*.scss'))
        .pipe(gulpSass())
        .pipe(postcss(processors))
        .pipe(gulp.dest(buildRoot));
    cb();
}

//  ============================================================
//          工作 2 最小化css 更名至 index.min.css
//  ============================================================

const minCss = function(cb){
    console.log('Minimum CSS file');
    gulp.src(path.join(buildRoot, 'index.css'))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildRoot));
    cb();
}

//  ============================================================
//          工作 3 一條龍 SASS Compiler to Min CSS
//  ============================================================

const Sass2Css = function(cb) {
    console.log('compile SASS to CSS');
    gulp.src(path.join(srcRoot, 'styles/**/*.scss'))
        .pipe(gulpSass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/'))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildRoot));
    cb();
}

//  ============================================================
//          工作 4 清空 /build/下所有檔案
//  ============================================================
// exports.default = Sass2Css;
const cleanBuild = function(cb){
    console.log('clean the build Directory');
    gulp.src(path.join(buildRoot, '/**/*.*'))
        .pipe(clean());
    cb();
}

//  ============================================================
//          工作 4 持續監控 build/所有檔案的異動，並重新建構
//  ============================================================

// gulp.watch('src/**/*.*', {}, function(cb){
//     gulp.series(cleanBuild, Sass2Css);
//     console.log('change');
//     cb();
// });

exports.build = Sass2Css;
exports.default = gulp.series(cleanBuild, Sass2Css);
// gulp.task('watch', function(){
//     gulp.watch('./src/styles/*.scss')
//         .on('change', function(path, stats) {
//             console.log(path);
//             code to execute on change
        // })
        // .on('unlink', function(path, stats) {
        //     console.log(path);
        //     code to execute on delete
        // });
// });
