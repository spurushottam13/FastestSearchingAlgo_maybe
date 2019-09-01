document.getElementById("input").addEventListener('input', function(e){
    console.clear()
    console.log(e.target.value)
    search(e.target.value)
    loopsearch(e.target.value)
})

window.algotime = 0
window.looptime = 0

//------------Genration of Node Tree
console.log(arr.length)
var store = {}
// ----------------- Algo Part 

function stepOne(data){
  
  let firstBit = data.charAt(0)
  if(store.hasOwnProperty(firstBit)){
    stepTwo(firstBit,data)
  } else{
    store[firstBit] = {}
    stepTwo(firstBit,data)
  }
}

function stepTwo(firstBit,data){
  let bit2 = data.charAt(1)
    if(store[firstBit].hasOwnProperty(bit2)){
      stepThree(firstBit,bit2,data)
    }else{
      store[firstBit][bit2] = {}
      stepThree(firstBit,bit2,data)
    }
}

function stepThree(firstBit,bit2,data){
  let bit3 = data.charAt(2)
    if(store[firstBit][bit2].hasOwnProperty(bit3)){
      store[firstBit][bit2][bit3].push(data)
    }else{
      store[firstBit][bit2][bit3] = []
      store[firstBit][bit2][bit3].push(data)
    }
}

arr.forEach(i => stepOne(i.toLowerCase()))
console.log(store)

var result =[]

function searchInArray(e,data){
  let result = []
  result = data.filter(item => {
      return item.toLowerCase().substr(0, e.length) === e.toLowerCase();
  });
  return result

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
 