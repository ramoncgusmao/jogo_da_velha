// Define as variáveis que vamos utilizar
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');

let currentTurn = X_CLASS;
let gameIsLive = true;

// Funções

function startGame() {
  currentTurn = X_CLASS;
  gameIsLive = true;
  messageElement.innerText = '';
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = currentTurn === X_CLASS ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, `${currentClass === X_CLASS ? "X" : "O"} ganhou!`);
  } else if (isDraw()) {
    endGame(true, "Empate!");
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw, message) {
  gameIsLive = false;
  if (draw) {
    messageElement.innerText = message;
  } else {
    messageElement.innerText = message;
  }
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  currentTurn = currentTurn === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (currentTurn === X_CLASS) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}

// Event listeners
restartButton.addEventListener('click', startGame);

// Inicializa o jogo
startGame();
