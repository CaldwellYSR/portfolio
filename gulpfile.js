var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var template = require('gulp-template-html');

gulp.task('js', function() {
    return gulp.src(['./js/*.js', './js/**/*.js'])
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/'))
            .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./sass/*.scss")
            .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
            .pipe(gulp.dest("./dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('./src/content/*.html')
            .pipe(template('./src/templates/template.html'))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.stream());
});

gulp.task('watch', ['js', 'sass', 'html'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/templates/**/*.html', ['html']);
    gulp.watch('src/content/**/*.html', ['html']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});
