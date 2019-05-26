Array.prototype.cursorUp = function(elem) {
  this.push(elem);
  this.length > 4 ? this.shift() : null;
  return this;
};

Array.prototype.loadFromArray = function(refArray, predicate = null) {
  return this.map(ln => { 
    return ln.map(el => {
      let name = !!predicate ? predicate : "value";
      return refArray.find(item => item[name] === el);
    });
  });
}

Array.prototype.load = function(callback) {
  return this.map(ln => { 
    return ln.map(el => {
      return callback(el);
    });
  });
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

// console.log(a.load(obj));