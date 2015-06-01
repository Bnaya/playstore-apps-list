var gulp = require('gulp');
var tinylr = require('tiny-lr');

gulp.task('watch', function () {
    gulp.watch(['extension/src/**/*.js'], ['babel']);

    var lr = tinylr();
    lr.listen(35729);
    gulp.watch(['extension/**', '!extension/src/**', '!extension/dist/bundle.js.map'], function (evt) {
		console.log('reloading');
        lr.changed({
            body: {
                files: [evt.path]
            }
        });
    });
});