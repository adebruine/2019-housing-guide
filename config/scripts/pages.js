console.log("hey")
function generateArticles(){

  console.log("yo yo")
  var stories = copy.stories;
  var storytemp = Handlebars.compile(articleHtml);

  for (var x = 0; x < stories.length; ++x) {
    var context = {
      hed: stories[x]['hed'],
      slug: stories[x]['slug'],
      author: stories[x]['author'],
      authorlink: stories[x]['author-link'],
      lead: stories[x]['lead'],
      story: stories[x]['story'],
      link: 'http://apps.northbynorthwestern.com/year-in-media/2017/' + stories[x]['slug'],
      index: x+1,
    }
    //create the directory if not already created
    var dir = './out/'+context.slug;
    mkdirp.sync(dir, function (err) {
      if (err) console.error(err)
      else console.log('pow!')
    })

    //create an html file in the directory
    var fileName = './out/'+context.slug+'/index.html';
    var stream = fs.createWriteStream(fileName);

    var articleResult = storytemp(context);
    var prettifiedResult = prettifyHtml(articleResult);

    stream.write(prettifiedResult);
  }
    stream.end();
}
