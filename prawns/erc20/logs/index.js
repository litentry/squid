var fs = require('fs');
var files = fs.readdirSync('./');
console.log(files);
const filtered = files.filter((f) => !!~f.indexOf('-'));
const hashes = filtered.map((f) => {
  return f.split('-')[1].replace('.json', '');
});
console.log(hashes);
