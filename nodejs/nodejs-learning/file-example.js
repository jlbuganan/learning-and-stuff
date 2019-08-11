const fs = require('fs');
const data = fs.readFile('./file.md', 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  console.log(data);
})

console.log('More work');