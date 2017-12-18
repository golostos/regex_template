const gulp = require("gulp");
const path = require("path");
const browserSync = require("browser-sync").create();

let dirName = path.join(__dirname, "public");

gulp.task("browser-sync-init", function(done) {
  browserSync.init({
    server: {
      baseDir: dirName
    }
  });
  done();
});

gulp.task("default", gulp.series("browser-sync-init", function() {

  gulp
    .watch(`${dirName}/**/*.*`)
    .on("change", path => browserSync.reload(path))
    .on("add", path => browserSync.reload(path));
}));