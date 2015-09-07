var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');


/**
 * 错误处理
 */
function error(event) {
    gutil.beep();
    gutil.log(event);
}

gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['./theme/default/css/*.css','./theme/default/js/*.js','./theme/default/img/*.*','./theme/default/fonts/*.*'], cb);
});
gulp.task('style', function () {
    return gulp.src('./static/css/site.less')
        .pipe(plumber({errorHandler: error}))
        .pipe(less())
        .pipe(concat('mkdocs-min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade : false
        }))
        .pipe(gulp.dest('./theme/default/css'));
});
gulp.task('js', function () {
    return gulp.src(['./bower_components/jquery/dist/jquery.js','./bower_components/modernizr/modernizr.js','./static/js/highlight.pack.js','./static/js/theme.js'])
        .pipe(plumber({errorHandler: error}))
        .pipe(concat('mkdocs-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./theme/default/js'));
});
gulp.task('html', function () {
    return gulp.src(['./static/*.html'])
        .pipe(gulp.dest('./theme/default/'));
});
gulp.task('img', function () {
    return gulp.src(['./static/img/*.*'])
        .pipe(gulp.dest('./theme/default/img'));
});
gulp.task('fonts', function () {
    return gulp.src(['./static/fonts/*.*'])
        .pipe(gulp.dest('./theme/default/fonts'));
});

gulp.task('css', function () {
    return gulp.src(['./static/css/*.css'])
        .pipe(gulp.dest('./theme/default/css'));
});



gulp.task('default', ['clean','style','html','img','fonts','js']);