'use strict';

var gulp = require('gulp');
var $_ = require('gulp-load-plugins')({rename: {'gulp-autoprefixer':'prefix'}});

gulp.task('default', function(){
    gulp.src('./config.yml').pipe($_.yaml({space:4})).pipe(gulp.dest('./'));
    
    var config = require('./config.json');
    var catagories = config,
    
    catagory,files,file,
    target = ['./source/base.styl'],
    count = 0;
   
    for (catagory in catagories) {
        if(catagories.hasOwnProperty(catagory)){
            files = catagories[catagory];
            for(file in files) {
                if(files.hasOwnProperty(file) && files[file]){
                    target.push('./source'+catagory+'/'+file+'.styl');
                    count += 1;
                }
            }
        }
    }
   
    target.push('./source/keyframes.styl');
   
    if (!count) {console.log('Error | No Animations Activated!');}
    if (count) {
        console.log('Success | '+count+(count <= 1 ? ' Animation' : ' Animations')+' Activated');
    }
   
    gulp.src(target)
      .pipe($_.concat('animate.styl'))
      .pipe(gulp.dest('./source/'))
      .pipe($_.stylus())
      .pipe($_.prefix('last 1 version','bb 10'))
      .pipe(gulp.dest('./dist/'))
      .pipe($_.csso())
      .pipe($_.rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/'));
});
