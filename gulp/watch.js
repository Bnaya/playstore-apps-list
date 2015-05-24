var gulp = require('gulp');
var tinylr = require('tiny-lr');

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js'], ['babel']);

    var lr = tinylr();
    lr.listen(35729);
    gulp.watch(['dist/**/*.{js,css,jpeg,png}', 'pageActionWindow.html', 'background.html'], function (evt) {
		console.log('reloading');
        lr.changed({
            body: {
                files: [evt.path]
            }
        });
    });
});