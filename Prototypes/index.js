const EOL = require('os').EOL;

// Push a new message in the events log, and keep it 4 length max
Array.prototype.runCursor = function(elem) {
  this.push(elem);
  this.length > 4 ? this.shift() : null;
  this.toScreen();
};

// Find an element in a matrix
Array.prototype.matrixFind = function(refArray, predicate = null) {
  return this.map(ln => { 
    return ln.map(el => {
      let name = !!predicate ? predicate : "value";
      return refArray.find(item => item[name] === el);
    });
  });
}

console.log("*******************************");
Array.prototype.toScreen = function() { 
  console.log([...this.map(str => ` - ${str}`),
    "*******************************"].join('\n')
  );
}

// Load each cells from a matrix to a callback
Array.prototype.forEachCell = function(callback) {
  return this.map(ln => {
    return ln.map(el => {
      return callback(el);
    });
  });
}

// Get the End Of Line glyph from the right O/S
String.prototype.getEOL = function() {
  return this.match('\r\n') ?
                '\r\n' : this.match('\n') ?
                    '\n' : EOL;
}

// const a = [
//   ["a", "b", "c"],
//   ["a", "b", "c"],
//   ["a", "b", "c"],
// ]
// const b = [
//   {value: "a", def: "b"},
//   {value: "b", def: "c"},
//   {value: "c", def: "a"},
// ];
// const obj = {
//   a: {value: "a"},
//   b: {value: "b"},
//   c: {value: "c"},
// }

// console.log(a.forEachCell(obj));