var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

gulp.task('scss', function () {

  return gulp.src('assets/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concat('assets/css/stylesheet.css'))
  .pipe(cssnano())
  .pipe(gulp.dest(''));
});

gulp.task('watch', function(){
  gulp.watch('assets/scss/**/*.scss', ['scss']);
  // Other watchers
})

gulp.task('images', function(){
  return gulp.src('assets/imgs/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('imgs'))
});

gulp.task('default', ['scss', 'watch']);
