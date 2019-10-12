var datauriPlugin = require('../');
var fs = require('fs');
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
require('mocha');

var should = require('should');

describe('gulp-replace', function() {
  describe('datauriPlugin()', function() {
    it('should replace img in css and pass if not find file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/file.css',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/file.css')
      });


      var stream = datauriPlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/file.css', 'utf8'));
        done();
      });
      stream.write(file);
      stream.end();
    });
  });
});
