const gulp = require('gulp');
const babel = require('gulp-babel');
const importCss = require('gulp-import-css');
const replace = require('gulp-replace');
const less = require('gulp-less');
const path = require('path');
const qn = require('gulp-qn');
// qiniu 推荐cdn
const _imgCdn = 'https://xcimg.szwego.com';
// var _imgCdn = 'http://ol3uhx3cw.bkt.clouddn.com';
// var _imgCdn = 'build';

const qiniuImg = {
    accessKey: '23WtVnKHrj37_NmValDCRH1JDiGncma4dzDeWl3H',
    secretKey: 'Yem50dRHdfSGAbEaH9DogRxc6-V8EEBxnkhCANVN',
    bucket: 'lookbook-server-img',
    domain: _imgCdn,
    origin: '',
};

gulp.task('js', () => {
    process.env.NODE_ENV = 'production';
    return gulp
        .src('src/**/*.js')
        .pipe(
            babel({
                // presets: [
                //     '@babel/env',
                // ],
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-transform-async-to-generator',
                    'react-loadable/babel',
                ],
            })
        )
        .pipe(replace('.less', '.css'))
        .pipe(
            replace(
                /(@image)|(@utils)|(@stores)|(@routes)|(@weui)|(@hoc)|(@native)|(@components)|(@constants)|(@api)/g,
                match => {
                    if (match === '@image') {
                        return 'wsxc_album/lib/image';
                    }
                    if (match === '@utils') {
                        return 'wsxc_album/lib/utils';
                    }
                    if (match === '@stores') {
                        return 'wsxc_album/lib/stores';
                    }
                    if (match === '@routes') {
                        return 'wsxc_album/lib/routes';
                    }
                    if (match === '@weui') {
                        return 'wsxc_album/lib/components/weui';
                    }
                    if (match === '@hoc') {
                        return 'wsxc_album/lib/components/hoc';
                    }
                    if (match === '@native') {
                        return 'wsxc_album/lib/components/native';
                    }
                    if (match === '@components') {
                        return 'wsxc_album/lib/components';
                    }
                    if (match === '@constants') {
                        return 'wsxc_album/lib/constants';
                    }
                    if (match === '@api') {
                        return 'wsxc_album/lib/api';
                    }
                }
            )
        )
        .pipe(gulp.dest('lib'));
});

gulp.task('less', () => {
    return gulp
        .src('./src/**/*.less')
        .pipe(
            less({
                paths: [path.join(__dirname, 'less', 'includes')],
            })
        )
        .pipe(gulp.dest('lib'));
});

// gulp.task('css', () => {
//     return gulp.src(['src/*.css'])
//         .pipe(importCss())
//         .pipe(gulp.dest('lib'))
// });

gulp.task('css', () => {
    return gulp
        .src(['src/font/*.css'])
        .pipe(importCss())
        .pipe(gulp.dest('lib/font'));
});

gulp.task('route', () => {
    process.env.NODE_ENV = 'production';
    return gulp
        .src('src/route.js')
        .pipe(
            babel({
                // presets: [
                //     '@babel/env',
                // ],
                // plugins: [
                //     "@babel/plugin-syntax-dynamic-import",
                //     "@babel/plugin-transform-async-to-generator",
                //     "react-loadable/babel"
                // ]
            })
        )
        .pipe(replace('./', 'wsxc_album/lib/'))
        .pipe(
            replace(
                /(@image)|(@utils)|(@stores)|(@routes)|(@weui)|(@hoc)|(@native)|(@components)|(@constants)|(@api)/g,
                match => {
                    if (match === '@image') {
                        return 'wsxc_album/lib/image';
                    }
                    if (match === '@utils') {
                        return 'wsxc_album/lib/utils';
                    }
                    if (match === '@stores') {
                        return 'wsxc_album/lib/stores';
                    }
                    if (match === '@routes') {
                        return 'wsxc_album/lib/routes';
                    }
                    if (match === '@weui') {
                        return 'wsxc_album/lib/components/weui';
                    }
                    if (match === '@hoc') {
                        return 'wsxc_album/lib/components/hoc';
                    }
                    if (match === '@native') {
                        return 'wsxc_album/lib/components/native';
                    }
                    if (match === '@components') {
                        return 'wsxc_album/lib/components';
                    }
                    if (match === '@constants') {
                        return 'wsxc_album/lib/constants';
                    }
                    if (match === '@api') {
                        return 'wsxc_album/lib/api';
                    }
                }
            )
        )
        .pipe(gulp.dest('lib'));
});

gulp.task('image', () => {
    return gulp.src(['./src/image/*.*']).pipe(gulp.dest('lib/image'));
});

gulp.task('publish-image', () => {
    return (
        gulp
            .src(['./src/image/*.*'])
            // .pipe(rev())
            // .pipe(gulp.dest('./dist/image'))
            .pipe(
                qn({
                    qiniu: qiniuImg,
                    prefix: '',
                })
            )
    );
    // .pipe(rev.manifest())
    // .pipe(gulp.dest('./build/rev/image'));
});

gulp.task('default', gulp.series(['js', 'css', 'less', 'route', 'image', 'publish-image']));
