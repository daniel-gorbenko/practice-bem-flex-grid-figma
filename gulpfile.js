let { src, dest } = require('gulp');
let path = require('path');
let concat = require('gulp-concat');
let modifyCssUrls = require('gulp-modify-css-urls');

let order = [
  path.resolve(__dirname, "src", "common.css")
];

let globs = [
  "components/time-slider",
  "components/icon",
  "components/card",
  "components/application"
];

globs.forEach((glob) => order.push(path.resolve(__dirname, "src", glob, '**/*.css')));

exports.default = () => {
  return src(order)
    .pipe(modifyCssUrls({
      modify: function (url, filePath) {
        return path.resolve(path.dirname(filePath), url);
      }
    }))
    .pipe(concat('build.css'))
    .pipe(dest('./build/'));
};
