import gulp from "gulp";
const { src, dest, watch, series, parallel } = gulp;

// CSS
import gulpSass from "gulp-sass";
import dartSass from "sass";
import plumber from "gulp-plumber";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "gulp-postcss";

// Imágenes
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import newer from "gulp-newer";

// JS
import terser from "gulp-terser";
import rename from "gulp-rename";
import concat from "gulp-concat";

// Sourcemaps
import sourcemaps from "gulp-sourcemaps";

// Sass compiler
const sass = gulpSass(dartSass);

// Rutas
const path = {
	scss: "src/scss/**/*.scss",
	js: "src/js/**/*.js",
	img: "src/img/**/*.{png,jpg,jpeg,svg}",
	buildImg: "public/build/img/",
};

// CSS Task
export function css() {
	return src(path.scss)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write("."))
		.pipe(dest("public/build/css"));
}

// JS Task
export function javascript() {
	return src(path.js)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(concat("bundle.js"))
		.pipe(terser())
		.pipe(sourcemaps.write("."))
		.pipe(dest("public/build/js"));
}

// Optimizar imágenes
export function images() {
	return src(path.img)
		.pipe(newer(path.buildImg))
		.pipe(imagemin({ optimizationLevel: 3 }))
		.pipe(dest(path.buildImg));
}

// Convertir a WebP
export function webpTask() {
	return src(path.img)
		.pipe(newer(path.buildImg))
		.pipe(webp({ quality: 50 }))
		.pipe(dest(path.buildImg));
}

// Watch
export function dev() {
	watch(path.scss, css);
	watch(path.js, javascript);
	watch(path.img, series(images, webpTask));
}

// Tarea por defecto
export default parallel(css, javascript, images, webpTask, dev);
