document.getElementById("input").addEventListener('input', function (e) {
  console.clear()
  console.log(e.target.value)
  // search(e.target.value)
  newSearch(e.target.value)
  loopsearch(e.target.value)
})

window.algotime = 0
window.looptime = 0

console.log("Data Length", arr.length)

// ----------------------------------------{ + New Arch + }----------------------------------
var store = {}

// Gets the last node  of object
const getLastNode = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

// #Sets the value of last node
const setLastNode = function (obj, value, path) {
  if (!path.length === 1) {
    path.pop()
  }
  let length = path.length;
  var current = obj;
  path.forEach(function (key, index) {
    if (index === length - 1) {
      let currentValue = current[key]
      if (currentValue) {
        current[key] = { ...{ [currentValue]: currentValue }, ...value };
      } else {
        current[key] = { ...value };
      }
    }
    else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
  });
}

// #Convert Array to Object
const convertToObject = (arr) => {
  return arr.reduceRight(
    (accumulator, item) => {
      const newAccumulator = {};
      newAccumulator[item] = Object.assign(
        {},
        accumulator
      );
      return newAccumulator;
    },
    {}
  );
};

/* 
# Render Store 
  ---> 1.) Convert the word to store in lower case
  #function alpha(){ --> Recursion funtion a
    if(){
      --> Return from function, when done with rendering the string into store.
    }
    if{
      ---> i)  get current string
      ---> ii) find the last node of object which can be generated from this string
      ---> iii) when current string reaches till where it's node is not present on store, 
    }    
    # else{    --> Run when part of string not present in store nodes
      --> i)   extract only that part of string which is not present  @tempString
      --> ii)  convert that string into single-key-object @tempObject
      --> iii) set the value of last node to @tempObject. and hence complete the chain of characters of string in the store.
    }    
  }
 */
var largestTime = ""
var largestTimeString = ""

function renderStore(word) {
  var s_oneString = performance.now()
  word = word.toLowerCase()
  alpha(1)
  function alpha(index) {
    if (index > word.length) {
      return
    }
    let currentString = word.substring(0, index)
    if (getLastNode(currentString.split(""), store)) {
      alpha(index + 1)
    } else {
      let tempString = word.substring(index, word.length)
      let tempObject = convertToObject(tempString.split(""))
      setLastNode(store, tempObject, currentString.split(""))
    }
  }
  var f_oneString = performance.now()
  if(f_oneString - s_oneString >= largestTime){
    largestTime = f_oneString - s_oneString
    largestTimeString = word
  }
}
var x0 = performance.now()
arr.forEach(item => renderStore(item))
var x1 = performance.now()
console.log(store)
console.log("Formation of object took ", x1 - x0 )
console.log(largestTimeString ,largestTime)

// ----------------------------------------{ + Store Query + }----------------------------------

// #Object -> Array
function queryInStore(obj) { 
  if(obj  === null){
    return []
  }
  if (typeof (obj) !== "object") {
    return [obj];
  }
  var result = [];
  if (obj.constructor === Array) {
    obj.map(function (item) {
      result = result.concat(queryInStore(item));
    });
  } else {
    Object.keys(obj).map(function (key) {
      if (Object.keys(obj[key]).length > 0) {
        var chunk = queryInStore(obj[key]);
        chunk.map(function (item) {
          result.push(key + item);
        });
      } else {
        result.push(key);
      }
    });
  }
  return result;
}

function newSearch(e) {
  var t0 = performance.now()
  let currObj = getLastNode(e.split(""), store)
  var t1 =  performance.now()
  console.log("Algo search was " + (t1 - t0) + " milliseconds. for ", e)
  window.algotime = t1-t0
  console.log(queryInStore(currObj))
}

// ----------------------------------------{ + Loop Query + }----------------------------------

var loopResult = []
function loopsearch(e) {
  var m0 = performance.now()
  loopResult = arr.filter(item => {
    return item.toLowerCase().substr(0, e.length) === e.toLowerCase();
  });
  var m1 = performance.now()
  looptime = m1 - m0
  console.log("Loop search was " + (m1 - m0) + " milliseconds. for ", e)
  console.log("Result found : ", loopResult.length)
  console.log(loopResult)

  runStatics()
}

function runStatics() {
  if (algotime < looptime) {
    console.log(`%c 🥇 Winner : Algo ➡ ${window.looptime - window.algotime}  ${Math.floor(window.looptime / window.algotime)} times`, "font-size: 2rem")
  } else if (algotime === looptime) {
    console.log(`%c ⏱️ Tie `, "font-size: 2rem")
  } else {
    console.log(`%c 🥇 Winner : loop ➡ ${window.algotime - window.looptime} ${Math.floor(window.algotime / window.looptime)} `, "font-size: 2rem")
  }
}


