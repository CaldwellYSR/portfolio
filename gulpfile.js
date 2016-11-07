var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('js', function() {
    return gulp.src(['./js/*.js', './js/**/*.js'])
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('.'))
            .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./sass/*.scss")
            .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
            .pipe(gulp.dest("./css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', ['js', 'sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});
