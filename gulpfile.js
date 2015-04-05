'use strict';
var gulp = require('gulp');
var config = require('./config.json');
var $_ = require('gulp-load-plugins')({rename: {'gulp-autoprefixer':'prefix'}});
var gutil = require('gulp-util');
var fs = require('fs-extra');
gulp.task('default', function(){
    fs.readJson('./config.json',function(err,data) {
        if(err) {console.warn(err);}
        var catagories = data;
        var catagory,file,files;
        var target = ['./source/base.styl'],
            count = 0;
        for (catagory in catagories) {
            if(catagories.hasOwnProperty(catagory)) {
                files = catagories[catagory];
                for(file in files) {
                    if(files.hasOwnProperty(file) && files[file]) {
                        target.push('./source/'+catagory+'/'+file+'.styl');
                        count +=1;                    }
                }
            }
        }
        target.push('./source/keyframes.styl');
        if (!count) {gutil.log(gutil.colors.red('Error | No Animations Activated!'));}
        if (count) {gutil.log(gutil.colors.green('Success | '+count+(count <= 1 ? ' Animation' : ' Animations')+' Activated'));}
        gulp.src(target)
            .pipe($_.concat('animate.styl'))
            .pipe(gulp.dest('./'))
            .pipe($_.stylus())
            .pipe($_.prefix('last 1 versions','bb 10'))
            .pipe(gulp.dest('./'))
            .pipe($_.csso())
            .pipe($_.rename({suffix:'.min'}))
            .pipe(gulp.dest('./'));
    });
});