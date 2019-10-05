var gulp = require("gulp"),
  rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
// var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var nodemon = require("gulp-nodemon");
// var browserify = require("browserify");
// var fs = require("fs");
// var browserify = require("gulp-browserify");
// var vueify = require("vueify");
// var log = require("fancy-log");
// var babel = require("gulp-babel");
// // var vueComponent    = require('gulp-vue-single-file-component');
// var watchify = require("watchify");
// var source = require("vinyl-source-stream");
// var buffer = require("vinyl-buffer");
// var log = require("gulplog");
// var sourcemaps = require("gulp-sourcemaps");
// var assign = require("lodash.assign");
var run = require("gulp-run-command");

gulp.task("purgecss", () => {
  return gulp.src("app/public/*.css").pipe(
    rename({
      suffix: ".rejected"
    })
      .pipe(
        purgecss({
          content: ["app/views/*.html", "app/views/*.ejs"],
          rejected: true
        })
      )
      .pipe(gulp.dest("app/public/css"))
  );
});

gulp.task("nodemon", function() {
  nodemon({
    script: "app/app.js",
    ext: "js ejs json",
    exec: "node --inspect=9229"
  });
});

gulp.task(
  "browser-sync",
  gulp.series("nodemon", function() {
    browserSync.init(null, {
      proxy: "http://localhost:8000",
      // files: ["public/**/*.*"],
      // browser: "google-chrome",
      port: 8001
    });
  })
);

gulp.task("bs-reload", function() {
  browserSync.reload();
});

gulp.task("images", function() {
  gulp
    .src("app/images/**/*")
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest("dist/images/"));
});

gulp.task("styles", function() {
  return gulp
    .src("app/public/scss/main.scss")
    .pipe(
      sass({
        // outputStyle: 'compressed'
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("app/public/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("scripts", function() {
  return (
    gulp
      .src("app/public/scripts/scripts.js")
      // .pipe(concat('main.js'))
      .pipe(rename({ suffix: ".min" }))
      .pipe(uglify())
      .pipe(gulp.dest("app/public/scripts"))
      .pipe(browserSync.stream())
  );
});

gulp.task("js-watch", gulp.task("scripts", function() {
  nodemon({
    script: "app/app.js",
    ext: "js ejs json",
    exec: "node --inspect=9229"
  });
  
  browserSync.reload();
  // done();
}));

gulp.task("building", function() {
  run("echo hello world");
});
gulp.task("vue", function() {
  // console.log('h')
  // run('browserify -t vueify -e ./app/public/vue/vueinit.js -o ./app/public/js/build.js')
  run("npm run vue");
  // var cmd = new run.Command('cat')
  // cmd.exec('npm run vue')
});
// gulp.task('vue',function(){
// return gulp.src('app/public/vue/vueinit.js')
// .pipe(browserify({
// transform: vueify,
// debug : !gulp.env.production
// extensions:['.vue']
// }))
// .pipe(rename('app/public/js/bundle.js'))
// .pipe(gulp.dest('app/public/js'))
// return browserify('app/public/vue/vueinit.js')
// .pipe(babel())
// // .transform(babelify,{ "presets": [ "es2015" ] })
// // .transform(vueify)
// .transform(vueify)
// .bundle()
// .pipe(fs.createWriteStream("app/public/js/bundle.js"))
// return gulp.src('app/public/vue/*.vue')
// .pipe(vueComponent({ debug: true, loadCssMethod: 'loadCss' }))
// .pipe(babel({ plugins: 'transform-es2015-modules-amd' })) // Optional line which converts the component to an AMD module
// // .pipe(rename({ extname: '.js' }))
// .pipe(gulp.dest('app/public/vue/components'));

// })

gulp.task("build", gulp.series(["styles", "purgecss", "scripts"], function() {
  nodemon({
    script: "app/app.js",
    ext: "js ejs json",
    exec: "node --inspect=9229"
  });
}));

gulp.task(
  "serve",
  gulp.series(["scripts", "styles", "purgecss", "browser-sync", "bs-reload"],function() {
    gulp.watch("app/public/scss/**/*.scss", ["styles"]);
    // gulp.watch("app/public/locales/*.json", ["js-watch", "bs-reload"]);
    gulp.watch("app/public/js/partials/*.js", ["js-watch", "bs-reload"]);
    gulp.watch("app/views/**/*.ejs", ["bs-reload"]);
  }));