const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')

let time = 0

let score = 0

const colors = ['red', 'blue', 'yellow', 'green']

const board = document.querySelector('#board')

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})  

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame(){
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

function decreaseTime(){
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00 : ${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>На сколько ты меткий: <span class='primary' >${score}</span> </h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const randomColor = getRandomColor()
    circle.style.top =`${y}px`
    circle.style.left =`${x}px`
    circle.style.backgroundColor = randomColor
    board.append(circle)
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function changeCircleColor(circle){
    const randomColor = getRandomColor()
    circle.style.backgroundColor = randomColor
}

