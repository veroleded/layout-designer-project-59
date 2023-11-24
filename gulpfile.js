const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

const browsersync = () => {
  browserSync.init({
    server: { baseDir: 'build/' },
    notify: false,
    online: true,
  });
  watch('./app/images/**/*', copyImages);
  watch('./app/**/*.scss', sass2css);
  watch('./app/**/*.pug', pug2html);
};

const sass2css = () =>
  src('./app/styles/app.scss')
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(dest('build/styles'))
    .pipe(browserSync.stream());

const copyImages = () => src('./app/images/**/*').pipe(dest('build/images')).pipe(browserSync.stream());

const pug2html = () =>
  src('./app/pages/*.pug').pipe(pug()).pipe(dest('build')).pipe(browserSync.stream());

const build = parallel(sass2css, pug2html, copyImages);

exports.build = build;

exports.default = series(build, browsersync);
