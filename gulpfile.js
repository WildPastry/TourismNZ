//INSTALL
var gulp = require('gulp');
sass = require('gulp-sass');
livereload = require('gulp-livereload');
connect = require('gulp-connect');
useref = require('gulp-useref');
cssnano = require('gulp-cssnano');
uglify = require('gulp-uglify');
gulpIf = require('gulp-if');
imagemin = require('gulp-imagemin');
cache = require('gulp-cache');
del = require('del');
jshint = require('gulp-jshint');
runSequence = require('run-sequence');
htmlv = require('gulp-html-validator');

//LOCAL SERVER
gulp.task('serve', function (event) {
  connect.server({
    root: '',
    port: 1988,
    livereload: true
  });
  event();
});

//SASS
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

//HTML
gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(connect.reload());
});

// HTML VALIDATION
gulp.task('htmlv', function () {
 return gulp.src('src/*.html')
    .pipe(htmlv({format: 'html'}))
    .pipe(gulp.dest('./error'));
});

// JS LINT
gulp.task('lint', function() {
	return gulp.src('src/js/main.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(connect.reload());
});

// SCRIPT BUILD
gulp.task('script', function () {
  return gulp.src('src/framework/js/**/*.js|*.map')
    .pipe(gulp.dest('dist/js'))
});

//IMAGE BUILD
gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
});

//FONT BUILD
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

//FRAMEWORK BUILD
gulp.task('frameworkjs', function () {
  return gulp.src('src/framework/js/**/*')
    .pipe(gulp.dest('dist/framework/js'))
});

gulp.task('frameworkcss', function () {
  return gulp.src('src/framework/css/**/*')
    .pipe(gulp.dest('dist//framework/css'))
});

// MEDIA 
gulp.task('media', function () {
  return gulp.src('src/media/**/*')
    .pipe(gulp.dest('dist/media'))
});

//COMPILERS
gulp.task('useref', function () {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//CLEAN
gulp.task('clean', function (event) {
  del.sync('dist');
  event();
});

gulp.task('clear', function (callback) {
  return cache.clearAll(callback)
});

//WATCHERS
gulp.task('watch', function (event) {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/*.js', gulp.series('lint'));
  event();
});

//LOAD
gulp.task('default',
  gulp.series('serve', 'sass', 'html', 'lint', 'watch')
);

// BUILD
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('sass', 'useref', 'images', 'script', 'fonts', 'frameworkjs', 'frameworkcss', 'media')
  )
);