var gulp = require('gulp');
var concat = require('gulp-concat'); 
var cat = require('gulp-cat');  
var addsrc = require('gulp-add-src');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css'); 
var base64 = require('gulp-base64');
var gulpSequence = require('gulp-sequence');
var exec  =require('child_process').exec;

gulp.task('vendorjs',function() {
    vendorJsList=[ 
      "scripts/jquery.min.js",
      "scripts/bootstrap.min.js"
    ]; 
    gulp.src(vendorJsList)
        .pipe(concat('presentationScript.js'))  
        .pipe(gulp.dest('minScripts/')); 
});

gulp.task('drawjs',function() {
    list=[ 
        "drawboard/common.js",
        "drawboard/decorator.js",
        "drawboard/draw-helper.js",
        "drawboard/drag-helper.js",
        "drawboard/pencil-handler.js",
        "drawboard/eraser-handler.js",
        "drawboard/line-handler.js",
        "drawboard/rect-handler.js",
        "drawboard/events-handler.js"
    ]; 
    gulp.src(list)
        .pipe(uglify())
        .pipe(concat('drawBoardScript.js'))  
        .pipe(gulp.dest('minScripts/')); 
});

gulp.task('drawcss',function() {
    list=[ "css/Style.css",
        "drawboard/drawing.css"
    ]; 
    gulp.src(list)
        .pipe(concat('drawBoardCss.css'))  
        .pipe(gulp.dest('minScripts/')); 
});

gulp.task('js',function() {
    appJsList=[ 
        "property.js",
        "scripts/init.js",
        "scripts/sbootbox.min.js",
        "scripts/smd5.min.js", 
        "scripts/socket.io.js",
        "scripts/firebase.js",
        "scripts/RTCMultiConnection.js",
        "scripts/canvas-designer-widget.js",
        "scripts/BandwidthHandler.js",
        "scripts/rpiramudroid.js",
        "scripts/start.js",
    ]; 
    gulp.src(appJsList)
        //.pipe(uglify())
        .pipe(concat('mainScript.js'))  
        .pipe(gulp.dest('minScripts/')); 
});

gulp.task('css',function() {

    cssList=[
      "css/bootstrap.min.css",
      "css/font-awesome.min.css",
      "css/styles.css"
    ];

    gulp.src(cssList)
      //.pipe(minifyCss())
      .pipe(concat('mainStyle.css'))
      .pipe(gulp.dest('minScripts/'));
});

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout,stderr); });
};

gulp.task('git_pull',function(cb){
  execute('git pull',function(resp) {
      cb();
  });
});

gulp.task('default', gulpSequence(
    'vendorjs',
/*  'drawjs' , 
    'drawcss',*/
    'js',
    'css'
)); 
