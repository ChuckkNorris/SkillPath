var gulp = require('gulp');
var path = require("path");
var Builder = require('systemjs-builder');

gulp.task("bundle", function () {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('/', 'systemjs.config.js');

    builder
    .buildStatic('app/bin/main.js', 'outfile.js')
    .then(function() {
    console.log('Build complete');
    })
    .catch(function(err) {
    console.log('Build error');
    console.log(err);
    });
// return jspm({
//     bundleOptions: {
//         minify: true,
//         mangle: false
//     },
//     bundleSfx: true,
//     bundles: [
//         { src: './app/bin/main.js', dst: 'boot.bundle.min.js' }
//     ]
// })
// .pipe(gulp.dest('./js-temp'));


});