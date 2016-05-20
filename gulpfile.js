var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("styles/*.css").on("change", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("pages/*.html").on("change", browserSync.reload);
    gulp.watch("scripts/*.js").on("change", browserSync.reload);
});
