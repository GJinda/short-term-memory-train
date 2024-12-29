const $ = (selector) => {
  return document.querySelector(selector)
}

const selectAll = (selector) =>{
  return document.querySelectorAll(selector)
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function getNumArray() {
  let numArray = []
  for (let i = 1; i <= 25; i++) {
    numArray.push(i)
  }
  return numArray
}

function createDom(tpl) {
  const div = document.createElement('div');
  div.innerHTML = tpl;
  return div.children[0];
}
function getNumStr(num) {
  return `
    <div class='num-box'>${num}</div>
  `
}
function appendNum(numStr) {
  const NumDom = createDom(numStr);
  console.log('NumDom')
  console.log(NumDom)
  numContainer.appendChild(NumDom);
}
function createNumDom() {
  shuffleArray.forEach(element => {
    let numStr = getNumStr(element)
    appendNum(numStr)
  });
}

//get dom
const numContainer = $('.num-container')
const inputs = selectAll('ipnut')
console.log('inputs')
console.log(inputs)


//get random number array
const numArray = getNumArray()
const shuffleArray = getShuffleArray(numArray)

console.log('shuffleArray')
console.log(shuffleArray)
createNumDom()

