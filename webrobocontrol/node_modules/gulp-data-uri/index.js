
var es = require('event-stream');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');

module.exports = function() {


    var datauri = function(file, callback) {
        var app_path = path.dirname(module.parent.filename);
        var reg_exp = /url\(['|"](.+)['|"]\)/g;
        var isStream = file.contents && typeof file.contents.on === 'function' && typeof file.contents.pipe === 'function';
        var isBuffer = file.contents instanceof Buffer;

        if (isBuffer) {
            var str = String(file.contents);

            var matches = [], found;
            while (found = reg_exp.exec(str)) {
                matches.push({'txt':found[0],'url':found[1]});
            }

            for(var i=0, len=matches.length; i<len; i++){
                if(matches[i].url.indexOf('data:image') === -1){//if find -> image already decoded
                    var filepath = app_path+path.normalize(matches[i].url);
                    if (fs.existsSync(filepath)) {
                        var b = fs.readFileSync(filepath);
                        str = str.replace(matches[i].url,('data:image/'+path.extname(filepath).substr(1)+';base64,'+b.toString('base64')));
                    }
                    else{
                        gutil.log('gulp-data-uri:', gutil.colors.yellow('file not found and it is passed') + gutil.colors.gray(' (' + filepath + ')'));
                    }
                }
            }
            file.contents = new Buffer(str);

            return callback(null, file);
        }

        callback(null, file);
    };

    return es.map(datauri);
};
