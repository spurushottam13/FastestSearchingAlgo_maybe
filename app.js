/*                                                                                        Last Documented - 04/09/2019
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

document.getElementById("input").addEventListener('input', function (e) {
  console.clear()
  console.log(e.target.value)
  algoSearch(e.target.value)
  loopsearch(e.target.value)
})

window.algotime = 0
window.looptime = 0
console.log("Data Length", arr.length)

// ----------------------------------------{ + Production of Store + }----------------------------------
var store = {}

const getLastNode = (p, o, word) => p.reduce((xs, x) => {
  if (xs && xs[x]) {
    if (xs["result"]) {
      if (!xs["result"].includes(word)) {
        xs["result"].push(word)
      }
    } else {
      xs["result"] = []
    }
    return xs[x]
  } else {
    return null
  }
}, o)

const setLastNode = function (obj, value, path, word) {
  if (!path.length === 1) {
    path.pop()
  }
  let length = path.length;
  var current = obj;
  var tempResult = []
  path.forEach(function (key, index) {
    if (index === length - 1) {
      tempResult.push(word)
      current[key] = {
        result: tempResult,
        ...value
      };
    } else {
      current = current[key];
    }
  });
}

// #Convert Array to Object
const convertToObject = (arr) => {
  return arr.reduceRight(
    (accumulator, item) => {
      const newAccumulator = {};
      newAccumulator[item] = Object.assign({},
        accumulator
      );
      return newAccumulator;
    }, {}
  );
};


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
    if (getLastNode(currentString.split(""), store, word)) {
      alpha(index + 1)
    } else {
      let tempString = word.substring(index, word.length)
      let tempObject = convertToObject(tempString.split(""))
      setLastNode(store, tempObject, currentString.split(""), word)
    }
  }
  var f_oneString = performance.now()
  if (f_oneString - s_oneString >= largestTime) {
    largestTime = f_oneString - s_oneString
    largestTimeString = word
  }
}
var x0 = performance.now()
arr.forEach(item => renderStore(item))
var x1 = performance.now()
console.log(store)
console.log("Formation of object took ", x1 - x0)
console.log(largestTimeString, largestTime)


// ----------------------------------------{ + Algo Query + }----------------------------------

var cache = store
const getResultArray = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

var algoResult = []

function algoSearch(e) {
  var t0 = performance.now()
  algoResult = getResultArray(e.split(""), store)["result"]
  var t1 = performance.now()
  console.log("Algo search was " + (t1 - t0) + "  for ", algoResult.length)
  window.algotime = t1 - t0
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
  console.log("Loop search was " + (m1 - m0) + " for ", loopResult.length)
  runStatics()
}

function runStatics() {
  console.table({
    "Algo": algoResult,
    "Loop": loopResult
  })
  if (algotime < looptime) {
    console.log(`%c 🥇 Winner : Algo ➡ ${window.looptime - window.algotime}  ${Math.floor(window.looptime / window.algotime)} times`, "font-size: 2rem")
  } else if (algotime === looptime) {
    console.log(`%c ⏱️ Tie `, "font-size: 2rem")
  } else {
    console.log(`%c 🥇 Winner : loop ➡ ${window.algotime - window.looptime} ${Math.floor(window.algotime / window.looptime)} `, "font-size: 2rem")
  }
}