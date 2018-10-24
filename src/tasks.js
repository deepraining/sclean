import gulp from 'gulp';
import zip from 'gulp-zip';
import decompress from 'decompress';

export const registerArchiveTask = (dir, name) => {
  gulp.task('archive', () =>
    gulp
      .src(`${dir}/**/*`)
      .pipe(zip(name))
      .pipe(gulp.dest('./'))
  );
};

export const registerRestoreTask = (dir, file) => {
  gulp.task('restore', cb => {
    decompress(file, dir).then(() => {
      cb();
    });
  });
};
