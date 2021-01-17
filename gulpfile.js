let gulp = require("gulp");
let sass = require("gulp-sass");
let pug = require("gulp-pug");
let browserSync = require("browser-sync");
let del = require("del");

// Сервер (запускается по адресу http://localhost:3000, при изменение файлов перезагружается страничка)
function serve() {
  return browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
}

// Компиляция и склейка SASS
function styles() {
  return gulp
    .src("src/style/style.sass")
    .pipe(sass())
    .pipe(gulp.dest("build/css"));
}

// Компиляция PUG в HTML
function view() {
  return gulp
    .src("src/pages/*.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("build"));
}

function img() {
  return gulp.src("src/img/**/*.*").pipe(gulp.dest("build/img"));
}

function js() {
  return gulp.src("src/js/**/*.*").pipe(gulp.dest("build/js"));
}

function fonts() {
  return gulp.src("src/fonts/**/*.*").pipe(gulp.dest("build/fonts"));
}

// Следить за изменениями в файлах и запускать соответсвующую задачу
function watch() {
  gulp.watch("src/style/**/*.scss", styles);
  gulp.watch("src/**/*.pug", view);
  gulp.watch("src/img/*.*", img);
  gulp.watch("src/js/*.*", js);
  gulp.watch("src/fonts/**/*.*", fonts);
  gulp.watch("src/**/*.*").on("change", browserSync.reload);
}

// Удалить папку build
function clean() {
  return del(["build"]);
}

var build = gulp.series(clean, gulp.parallel(watch, styles, view, img, serve, js, fonts));

exports.default = build;