// ## Globals
var argv         = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var lazypipe     = require('lazypipe');
var cssNano      = require('gulp-cssnano');
var plumber      = require('gulp-plumber');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');

// `path` - Paths to base asset directories. With trailing slashes.
var path = {
  source: 'assets/',
  dist: 'dist/'
}

var devUrl = 'http://localhost/feedback-widget';

// CLI options
var enabled = {
  maps: !argv.production,
};

// Error checking; produce an error rather than crashing.
var onError = function (err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('styles', function() {
  return gulp.src(path.source + 'styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 8',
        'ie 9',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(cssNano({
      safe: true
    }))
    .pipe(gulp.dest(path.dist + 'styles'));
});

gulp.task('clean', require('del').bind(null, [path.dist]));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function() {
  browserSync.init({
    files: ['**/*.html', '*.html'],
    proxy: config.devUrl,
  });
  gulp.watch([path.source + 'scss/**/*'], ['styles']);
  gulp.watch(['assets/manifest.json'], ['build']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function(callback) {
  runSequence('styles', callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
