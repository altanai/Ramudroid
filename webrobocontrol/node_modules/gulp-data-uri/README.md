#gulp-data-uri [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> convert imgs from css to datauri

## Usage

First, install `gulp-data-uri` as a development dependency:

```shell
npm install gulp-data-uri --save-dev
```

Then, add it to your `gulpfile.js`:

```javascript
var data_uri = require('gulp-data-uri');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(data_uri())
    .pipe(gulp.dest('build/file.txt'));
});
```
[travis-url]: http://travis-ci.org/lazd/gulp-data-uri
[travis-image]: https://travis-ci.org/versoul/gulp-data-uri.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-data-uri
[npm-image]: https://badge.fury.io/js/gulp-data-uri.png