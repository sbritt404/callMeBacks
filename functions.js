const identity = function (value) {
  return value;
};

const first = function (array, n, callback = identity) {
  if (n === undefined) return callback(array[0]);
  return callback(array.slice(0, n));
};

const last = function (array, n, callback = identity) {
  if (n === undefined) return callback(array[array.length - 1]);
  return callback(array.slice(Math.max(array.length - n, 0)));
};

const each = function (collection, iterator, callback = identity) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else if (typeof collection === 'object' && collection !== null) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        iterator(collection[key], key, collection);
      }
    }
  }
  return callback(collection);
};

const indexOf = function (array, value, callback = identity) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) return callback(i);
  }
  return callback(-1);
};

const map = function (array, callback) {
  const results = [];
  for (let i = 0; i < array.length; i++) {
    results.push(callback(array[i], i, array));
  }
  return results;
};

const filter = (array, callback) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
};

const reject = (array, callback) => {
  return filter(array, (element, index, arr) => !callback(element, index, arr))
};

const uniq = (array, callback = (item) => item) => {
  const seen = new Set();
  return filter(array, (element, index, arr) => {
    const value = callback(element, index, arr);
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

const reduce = (collection, callback, initialValue) =>{
  let accumulator = initialValue
  for(let key in collection){
   if(accumulator === undefined){
     accumulator = collection[key]
     continue
   }
   accumulator = callback(accumulator, collection[key])
  }
  return accumulator
 };


module.exports = {
  identity,
  first,
  last,
  each,
  indexOf,
  map,
  filter,
  reject,
  uniq,
  reduce
};