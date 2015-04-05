'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del');

var config = require('./config.json'),
    target = ['./animations/base.styl'],
    count = 0;

var animDest = './',
    animCss = '/animate.css',
    animStyl = '/animate.styl';

gulp.task('clean',function(c,b,a){
    del('./animate.styl',a);
    del('./animate.css',b);
    del('./animate.min.css',c);
});

gulp.task('build',function(){
        var catagories = config,
            catagory,files,file;
        for (catagory in catagories) {
            if (catagories.hasOwnProperty(catagory)) {
                files = catagories[catagory];
                for (file in files) {
                    if (files.hasOwnProperty(file) && files[file]) {
                        target.push('./animations/' + catagory + '/' + file + '.styl');
                        count += 1;
                    }
                }
            }
        }
        if (!count) {
            gutil.log(gutil.colors.red('======================='));
            gutil.log(gutil.colors.red('No animations activated.'));
            gutil.log(gutil.colors.red('======================='));
        }else {
            gutil.log(gutil.colors.yellow('======================='));
            gutil.log(gutil.colors.yellow(count + (count <= 1 ? ' Animation' : ' Animations') + ' Activated'));
            gutil.log(gutil.colors.yellow('======================='));
        }
    gulp.src(target)
        .pipe(concat('animate.styl'))
        .pipe(gulp.dest(animDest));
});

gulp.task('cssify',function() {
    gulp.src(animDest + animStyl)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(prefix({browsers:['last 2 versions', 'bb 10'], cascade: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(animDest));
});

gulp.task('minify', function() {
    gulp.src(animDest + animCss)
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(animDest));
});

gulp.task('default', function(){});