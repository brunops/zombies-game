var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');

gulp.task('scripts', function () {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function () {
  return gulp.src('./css/**/*.css')
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('images', function () {
  return gulp.src('./public/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/public/images'))
});

gulp.task('watch', function () {
  gulp.watch('./js/**/*.js', ['scripts']);
  gulp.watch('./css/**/*.css', ['css']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['scripts', 'css', 'html', 'images', 'watch']);
