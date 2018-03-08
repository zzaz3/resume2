var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var include = require("gulp-include");

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // ChartJS
  gulp.src("./node_modules/chart.js/dist/Chart.min.js")
  .pipe(include({
    extensions: "js",
    hardFail: true,
  }))
  .pipe(gulp.dest("./vendor/js"));

  // Scroll Reveal
  gulp.src("./node_modules/scrollreveal/dist/scrollreveal.min.js")
  .pipe(include({
    extensions: "js",
    hardFail: true,
  }))
  .pipe(gulp.dest("./vendor/js"));

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

})

// Default task
gulp.task('default', ['vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
});
