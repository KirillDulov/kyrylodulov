const { task, series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb')

const plugins = [
  autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    cascade: true
  }), cssnano({ preset: 'default' })
];

const PATH = {
  htmlAllFiles: './*.html',
  scssAllFiles: './scss/**/*.scss',
};

function scss() {
  return src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 5 versions'], cascade: true })]))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
}

function scssMin() {
  return src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
}

function comb() {
  return src('./scss/**/*.scss')
    .pipe(csscomb('./.csscomb.json'))
    .pipe(dest('./scss'))
}



function syncInit(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

async function sync() {
  browserSync.reload();
}

function watchFiles() {
  watch(PATH.scssAllFiles, series(parallel(scss, scssMin), sync));
  watch(PATH.htmlAllFiles, sync);
}

task('scss', parallel(scss, scssMin));
task('watch', series(syncInit, watchFiles));
task('comb', comb)
task('default', series(parallel(scss, scssMin), syncInit, watchFiles));