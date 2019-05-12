const nunjucksEnv = require('./../tasks/nunjucks');
var fs = require('fs');
var mkdirp = require('mkdirp');

var dat = require("./../data/dorms.json")
var dorms = dat.dorms;

function generateDorms() {
  //console.log(dorms)
   for (var x = 0; x < dorms.length; x++) {

     var context = dorms[x];
     console.log(context);
     var res = nunjucksEnv.render('./../app/dorm2.html', context);

      var dir = './out/' + context.slug;
      
      mkdirp.sync(dir, function(err) {
        if (err) console.error(err);
        else console.log('pow!');
      });

    var fileName = './out/'+context.slug+'/index.html';
    console.log(fileName)
    var stream = fs.createWriteStream(fileName);
    stream.write(res);
  }
  stream.end();
}

generateDorms();
