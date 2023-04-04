const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageText = document.querySelector('[data-winning-message-text]');
let circleTurn;

// check if any player has won
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin(currentClass) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })
  })
}

// switch turns
function swapTurns() {
  circleTurn = !circleTurn;
  board.classList.toggle('circle');
}

// set hover class on board
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// check for draw
function checkDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  })
}

// end game
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'Draw!';
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

// main game function
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // check if the clicked cell is already marked or game is already ended
  if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) || winningMessageElement.classList.contains('show')) {
    return;
  }

  // mark the clicked cell
  cell.classList.add(currentClass);

  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (checkDraw()) { // check for draw
    endGame(true);
  } else { // switch turns
    swapTurns();
    setBoardHoverClass();
  }
}

// restart game
function restartGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageElement.classList.remove('show');
  setBoardHoverClass();
}

// initialize the game
function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  restartButton.addEventListener('click', restartGame);
  setBoardHoverClass();
}

// start the game on load
startGame();
