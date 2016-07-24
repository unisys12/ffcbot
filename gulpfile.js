var gulp = require('gulp');
var copy = require('gulp-copy');

gulp.task('copy-js', function(){
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-material/angular-material.min.js'
        ])
        .pipe(copy('./public/assets/js'));
});

gulp.task('copy-css', function(){
    return gulp.src('./node_modules/angular-material/angular-material.min.css')
        .pipe(copy('./public/assets/css'));
})