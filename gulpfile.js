var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename'),
  karma = require('karma').server;
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch(['./public/js/main.js', './public/js/libs/*.js'], ['browserify']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('browserify', function(){
  gulp.src(['./public/js/main.js'])
          .pipe(plumber())
          .pipe(browserify({
            insertGlobals: false
          }))
          .pipe(uglify())
          .pipe(rename({
            suffix: '.bundle'
          }))
          .pipe(gulp.dest('./public/js'));
});

gulp.task('karma', function (done) {
    return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', [
  'sass',
  'develop',
  'browserify',
  'watch'
]);
