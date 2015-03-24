var gulp = require("gulp");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("build", function(){
  gulp.src("js/demo.js")
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(uglify())
    .pipe(rename("demo.dist.js"))
    .pipe(gulp.dest("js/"));
});

gulp.task("watch", function(){
  gulp.watch("js/demo.js", ["build"]);  
});

