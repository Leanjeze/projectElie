const {src,dest,watch,parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const cache = require('gulp-cache');
// const concat = require('gulp-concat');

//utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//utilidad JS
// const terser = require('gulp-terser-js');
// const rename = require('gulp-rename');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}
// css es una función que se puede llamar automaticamente
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('./build/css') );
}


// function javascript() {
//     return src(paths.js)
//         .pipe(sourcemaps.init())
//         .pipe(concat('bundle.js')) // final output file name
//         .pipe(terser())
//         .pipe(sourcemaps.write('.'))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(dest('./build/js'))
// }

function imagenes() {
    return src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function watchArchivos() {
    watch( paths.scss, css );
    // watch( paths.js, javascript );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}

exports.css = css;
exports.watchArchivos = watchArchivos;
exports.default = parallel(css, imagenes, versionWebp, watchArchivos ); 