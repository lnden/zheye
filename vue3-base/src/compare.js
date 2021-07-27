// style 1: separate variables
let x = 0
let y = 0

function updateNumber() {
  x = 2
  y = 3
}

// compared to

// style 2: single object
const pos = {
  x: 0,
  y: 0
}

function updateObject() {
  pos.x = 2
  pos.y = 3
}

const { x } = pos
console.log(x);
pos.x = 3
console.log(pos.x)