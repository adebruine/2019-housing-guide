import mkdirp from 'mkdirp';

export default function makeDirs(parentDir, slugs) {
  for (let s in slugs) {
    let slug = slugs[s].name.toLowerCase();
    slug = slug.replace(' ', '-');
    let dirPath = `./../../{parentDir}/{slug}`;
    console.log("dir", dirPath)
    // let dir = './../../../data/';
    mkdirp.sync(dirPath, err => {
        if (err) console.error(err);
        else console.log('pow!');
    });
  }
}
