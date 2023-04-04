const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winModal = document.getElementById('winModal')
const winText = document.getElementById('winText')
const restartButton = document.getElementById('restartButton')
let currentTurn = X_CLASS
let isGameRunning = true

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  isGameRunning = true
  currentTurn = X_CLASS
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winModal.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  if (!isGameRunning || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return
  }
  placeMark(cell, currentTurn)
  if (checkWin(currentTurn)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(isDraw) {
  isGameRunning = false
  if (isDraw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `${currentTurn.toUpperCase()} Wins!`
  }
  winModal.classList.add('show')
}

function placeMark(cell, mark) {
  cell.classList.add(mark)
}

function swapTurns() {
  currentTurn = currentTurn === X_CLASS ? O_CLASS : X_CLASS
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  board.classList.add(currentTurn)
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function checkWin(mark) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(mark)
    })
  })
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
