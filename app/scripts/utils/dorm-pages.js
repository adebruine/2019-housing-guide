const fs = require('fs');

function writeDormPages(dorms) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`write this dorm page baby! ${dorms.length}`)
  } else {
    console.log('production')
  }

  // for (let dorm in dorms) {
  //
  // }
}

export default writeDormPages;
