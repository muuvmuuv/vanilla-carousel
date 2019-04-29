const path = require('path')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const typescript = require('gulp-typescript')
const minify = require('gulp-minify')

const project = typescript.createProject('./tsconfig.json')
const dist = path.resolve(__dirname, 'dist')

gulp.task('clean', () => {
  return gulp.src(dist, { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task('build:es6', () => {
  return project
    .src()
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(babel())
    .pipe(concat('carousel.js'))
    .pipe(
      minify({
        ext: {
          src: '.js',
          min: '.min.js',
        },
        preserveComments: 'some',
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist))
})

gulp.task('default', gulp.series('clean', 'build:es6'))

gulp.task(
  'watch',
  gulp.series('default', () => {
    gulp.watch('./src/*.ts', gulp.series('default'))
  })
)
