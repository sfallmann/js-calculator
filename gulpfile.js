var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var mainBowerFiles = require('main-bower-files');

gulp.task('uglify', function(){
    return gulp.src(mainBowerFiles())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/libs'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));

});
