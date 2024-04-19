const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'esm',
    dist: 'dist',
  },
  styles: 'src/**/*.less', // 样式文件路径
  scripts: ['src/**/*.{ts,tsx}', '!src/**/demo/*.{ts,tsx}'], // 脚本文件路径
};

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

function compilerScripts(babelEnv, destDir) {
  const { scripts } = paths;
  // 设置环境变量
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function (file, encoding, cb) {
        //在处理scripts任务中，截住style/index.js，生成style/css.js，并通过正则将引入的less文件后缀改成css。
        this.push(file.clone());

        if (file.path.match(/\/style\/index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content));
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          cb();
        } else {
          cb();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

function compilerCJS() {
  const { dest } = paths;
  return compilerScripts('cjs', dest.lib);
}

function compilerESM() {
  const { dest } = paths;
  return compilerScripts('esm', dest.esm);
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compilerCJS, compilerESM);

function copyLess() {
  const { styles, dest } = paths;
  return gulp.src(styles).pipe(gulp.dest(dest.lib)).pipe(gulp.dest(dest.esm));
}

// 将less编译成css
function lessToCss() {
  const { styles, dest } = paths;
  return gulp
    .src(styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩css
    .pipe(gulp.dest(dest.lib))
    .pipe(gulp.dest(dest.esm));
}

// 整体并行执行任务
const build = gulp.parallel(buildScripts, copyLess, lessToCss);

exports.build = build;
exports.default = build;
