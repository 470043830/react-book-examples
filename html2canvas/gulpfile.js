const gulp = require('gulp');
// const babel = require('gulp-babel');
// const replace = require('gulp-replace');
// const path = require('path');
const qn = require('gulp-qn');
// qiniu 推荐cdn
const _imgCdn = 'https://xcimg.szwego.com';
// var _imgCdn = 'http://ol3uhx3cw.bkt.clouddn.com';
// var _imgCdn = 'build';

const qiniuImg = {
    accessKey: '23WtVnKHrj37_NmValDCRH1JDiGncma4dzDeWl3H',
    secretKey: 'Yem50dRHdfSGAbEaH9DogRxc6-V8EEBxnkhCANVN',
    bucket: 'lookbook-server-img',
    origin: _imgCdn,
    // origin: '',
};

gulp.task('image', () => {
    return gulp.src(['./src/image/*.*']).pipe(gulp.dest('lib/image'));
});



const prefixDir = 'webapp_' + Math.floor(Math.random() * 100000000) + '/build/';

gulp.task('publish-css', () => {
    return (
        gulp
            .src(['./build/static/css/*.css'])
            .pipe(
                qn({
                    qiniu: qiniuImg,
                    prefix: prefixDir + 'static/css/',
                })
            )
    );
});
gulp.task('publish-js', () => {
    return (
        gulp
            .src(['./build/static/js/*.js'])
            .pipe(
                qn({
                    qiniu: qiniuImg,
                    prefix: prefixDir + 'static/js/',
                })
            )
    );
});
gulp.task('publish-html', () => {
    return (
        gulp
            .src(['./build/*.html'])
            .pipe(
                qn({
                    qiniu: qiniuImg,
                    prefix: prefixDir,
                })
            )
    );
});

gulp.task('default', gulp.series(['publish-css', 'publish-js', 'publish-html']));
