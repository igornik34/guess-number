const guessMessage = document.querySelector('.guess-message')
const score = document.querySelector('.score')
const body = document.querySelector('body')
const highestScore = document.querySelector('.highscore')
const questions = document.querySelector('.question')
const again = document.querySelector('.again')
const btnCheck = document.querySelector('.check')
const inputNum = document.querySelector('.number-input')
const header = document.querySelector('header')
const clue = document.createElement('p')
header.append(clue)
clue.classList.add('clue')
let randomNum = Math.floor(Math.random() * 20 + 1)
let scoreText = +score.textContent
const arrScores = []


document.addEventListener('DOMContentLoaded', () => {
    // Читаем данные из localStorage
    const savedArray = JSON.parse(localStorage.getItem('array'))
    
    // Если данные есть, обновляем соответствующие элементы на странице
    if (savedArray) {
      highestScore.textContent = Math.max(...savedArray)
      arrScores.push(...savedArray)
    }
  })


const check = (num) => {
    if(num == randomNum) {
        body.style.backgroundColor = 'rgb(9, 250, 21)'
        questions.textContent = randomNum
        arrScores.push(scoreText)
        localStorage.setItem('array', JSON.stringify(arrScores))
        highestScore.textContent = Math.max(...arrScores)
        guessMessage.textContent = 'Правильно!'
        inputNum.setAttribute('disabled', 'disabled')
    } else {
        scoreText -= 1
        score.textContent = scoreText
        if(num > randomNum) {
            clue.textContent = `Немного меньше чем ${num}`
        } else if(num < randomNum) {
            clue.textContent = `Немного больше чем ${num}`
        }
    }
}

btnCheck.addEventListener('click', e => {
    let inputNumText = inputNum.value
    check(inputNumText)
})

again.addEventListener('click', e => {
    randomNum = Math.floor(Math.random() * 20 + 1)
    body.style.backgroundColor = 'rgb(0, 0, 0)'
    questions.textContent = '???'
    guessMessage.textContent = 'Начни угадывать'
    inputNum.removeAttribute('disabled')
    inputNum.value = ''
    score.textContent = '20'
    scoreText = 20
})
