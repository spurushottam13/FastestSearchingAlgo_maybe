document.getElementById("input").addEventListener('input', function(e){
    console.clear()
    console.log(e.target.value)
   // search(e.target.value)
    newSearch(e.target.value)
    loopsearch(e.target.value)
})

window.algotime = 0
window.looptime = 0

//------------Genration of Node Tree
console.log(arr.length)
var store = {}
// ----------------- Algo Part 

// ---------------------------------{ + New Arch + } -------------------------------

const getLastNode = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const setLastNode = function(obj, value, path){
  if(!path.length === 1){
    path.pop()
  }
  let length = path.length;
  var current = obj;
  path.forEach(function (key, index) {
    if (index === length -1) {
      let currentValue = current[key]
      if(currentValue){
        current[key] = {...{[currentValue]:currentValue}, ...value};
      }else{
        current[key] = {...value};
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


const makeNestedObjWithArrayItemsAsKeys = (arr) => {
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

var newStore = {}

function formater(word){
  word = word.toLowerCase()
  alpha(1)
  function alpha(index){
    if(index > word.length){
      return
    }
    let currentString = word.substring(0, index)
    if(getLastNode(currentString.split(""), newStore)){
      alpha(index + 1)
    } else{
      let tempString = word.substring(index, word.length)
      let tempObject = makeNestedObjWithArrayItemsAsKeys(tempString.split(""))
      setLastNode(newStore, tempObject, currentString.split(""))
    }
  }
}

// arr.forEach(i => stepOne(i.toLowerCase()))
// console.log(store)

arr.forEach(item => formater(item))
console.log(newStore)

// -------------------------------------------------------------------------------------------------------------------

function nestedObjectToArray(obj) {
  if (typeof(obj) !== "object"){
      return [obj];
  }
  var result = [];
  if (obj.constructor === Array){
      obj.map(function(item) {
          result = result.concat(nestedObjectToArray(item));
      });
  } else {
      Object.keys(obj).map(function(key) {
          if(Object.keys(obj[key]).length > 0) {
              var chunk = nestedObjectToArray(obj[key]);
              chunk.map(function(item) {
                  result.push(key+item);
              });
          } else {
              result.push(key);
          }
      });
  }
  return result;
}

console.log(nestedObjectToArray(newStore[""]))


function newSearch(e){
  let currObj = getLastNode(e.split(""),newStore)
  console.log(nestedObjectToArray(currObj))
}

function toArray(obj,e) {
   // console.log(obj)
    const arr = [];
    for (const prop in obj) {
        const value = obj[prop];
        if (typeof value === 'object') {
            arr.push(toArray(value,e));
        }
        else {
              arr.push(value) 
            }
        }
   return arr.flat();
}

function search(e){
    var t0 = performance.now();    
    if(e.length === 1){
        if(!store.hasOwnProperty(e)){ 
        result = []
        } else{
        result = toArray(store[e],e)
        }
    }
    if(e.length === 2){
        if(!store[e.charAt(0)].hasOwnProperty(e)){
        result = toArray(store[e.charAt(0)],e)
        } else{
        result = toArray(store[e.charAt(0)][e.charAt(1)],e)
        }
    }

    if(e.length === 3){
        console.log("=3: ",result.length)
        if(!store[e.charAt(1)].hasOwnProperty(e)){
        result = toArray(store[e.charAt(0)][e.charAt(1)],e)
        } else{
        result = toArray(store[e.charAt(1)][e.charAt(1)],e)
        }
    }


    if(e.length > 4){
        console.log(">4: ",result.length)
        result = result.filter(item => {
        return item.toLowerCase().substr(0, e.length) === e.toLowerCase();
        });
    }
    console.groupEnd()
    var t1 = performance.now();
    algotime = t1-t0
    console.log("Algo Search in " + (t1 - t0) + " milliseconds. for ",e);
    console.log("Result found : ",result.length)
    console.log(result)
//console.log(Object.values(store[e]))
}

var loopResult = []

function loopsearch(e){
    var m0 = performance.now()
    loopResult = arr.filter(item => {
        return item.toLowerCase().substr(0, e.length) === e.toLowerCase();
    });
    var m1 = performance.now()
    looptime = m1-m0 
    console.log("loop search was " + (m1 - m0) + " milliseconds. for ",e )
    console.log("Result found : ",loopResult.length)
    console.log(loopResult)

    runStatics()
}

function runStatics(){
    if(algotime < looptime){
        console.log(`%c 🥇 Winner : Algo ➡ ${window.looptime - window.algotime}  ${Math.floor(window.looptime/window.algotime)} times`, "font-size: 2rem")
    } else if (algotime === looptime){
        console.log(`%c ⏱️ Tie `, "font-size: 2rem")
    } else{
        console.log(`%c 🥇 Winner : loop ➡ ${window.algotime - window.looptime} ${Math.floor(window.algotime/window.looptime)} `, "font-size: 2rem")
    }  
}
 

