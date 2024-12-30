const $ = (selector) => {
  return document.querySelector(selector)
}
const selectAll = (selector) => {
  return document.querySelectorAll(selector)
}
function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}
function hasClass(element, className) {
  return element.classList.contains(className);
}
function getChildIndex(child) {
  var parent = child.parentNode;
  for (var i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === child) {
      return i;
    }
  }
  // cannot find child
  return -1;
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
function getNumDomStr(num) {
  return `<div class='num-box'>${num}</div>`
}
function getInputDomStr() {
  return `<input class="input-box" type="text">`
}
function appendNum(numDomStr) {
  const numDom = createDom(numDomStr);
  numContainer.appendChild(numDom);
}
function appendInput(inputDomStr) {
  const inputDom = createDom(inputDomStr);
  inputDom.onblur = (event) => {
    numCount++
    if (numCount == 25) {
      setTimeout(() => {
        scoreText.innerHTML = `Score:${score}/${numCount}`
        removeClass(scoreText, 'hide')
        addClass(scoreText, 'show')
      }, 2000)
    }
    let inputValue = event.target.value
    if (inputValue) {
      // console.log(inputValue)
      // console.log(shuffleArray[index])
      addClass(event.target, 'hide')
      removeClass(numContainer, 'hide')
      let index = getChildIndex(event.target)
      if (inputValue == shuffleArray[index]) {
        score++
        removeClass(iconRight, 'hide')
        addClass(iconRight, 'show')
        setTimeout(() => {
          removeClass(iconRight, 'show')
          addClass(iconRight, 'hide')
        }, 1000)
      } else {
        addClass(numContainer.children[index], 'red')
        removeClass(iconError, 'hide')
        addClass(iconError, 'show')
        setTimeout(() => {
          removeClass(iconError, 'show')
          addClass(iconError, 'hide')
        }, 1000)
      }
    }
  }
  inputContainer.appendChild(inputDom);
}
function createNumDom() {
  shuffleArray.forEach(element => {
    let numDomStr = getNumDomStr(element)
    let inputDomStr = getInputDomStr()
    appendNum(numDomStr)
    appendInput(inputDomStr)
  });
}
function setTimer(seconds) {
  let minute = Math.floor(seconds / 60)
  let second = seconds % 60
  timer.innerHTML = minute > 0 ? (`${minute}` + ':' + (Math.floor(second / 10) > 0 ? `${second}` : ('0' + `${second}`))) : `${second}`
}
function countDown(seconds) {
  let countDownInterval = setInterval(() => {
    if (seconds == 0) {
      clearInterval(countDownInterval)
      addClass(timer, 'hide')
      addClass(numContainer, 'hide')
      removeClass(inputContainer, 'hide')
      addClass(inputContainer, 'show')
    }
    setTimer(seconds)
    seconds--
  }, 1000)
}

//get dom
const numContainer = $('.num-container')
const inputContainer = $('.input-container')
const timer = $('.timer')
const hint = $('.hint')
const iconRight = $('.icon-right')
const iconError = $('.icon-error')
const scoreText = $('.score-text')

//set countDown time
const seconds = 120
let numCount = 0
let score = 0

//get random number array
const numArray = getNumArray()
const shuffleArray = getShuffleArray(numArray)

console.log('shuffleArray')
console.log(shuffleArray)
createNumDom()
countDown(seconds)