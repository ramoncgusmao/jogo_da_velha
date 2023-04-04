const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-btn");
const message = document.querySelector(".winner-message");

let currentTurn = "X";

function init() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  restartButton.addEventListener("click", handleRestartClick);
  message.innerText = `vez do ${currentTurn}`;
}

function handleCellClick(e) {
  const cell = e.target;
  if (cell.innerText !== "") return;
  cell.innerText = currentTurn;
  if (checkWin()) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    swapTurn();
    message.innerText = `vez do ${currentTurn}`;
    setBoardHoverClass();
  }
}

function handleRestartClick() {
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  currentTurn = "X";
  message.innerText = `vez do ${currentTurn}`;
  setBoardHoverClass();
  init();
}

function swapTurn() {
  currentTurn = currentTurn === "X" ? "O" : "X";
}

function setBoardHoverClass() {
  board.classList.remove("xTurn");
  board.classList.remove("oTurn");
  board.classList.add(currentTurn === "X" ? "xTurn" : "oTurn");
}

function checkWin() {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return rows.some((row) => {
    const [a, b, c] = row;
    return (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[b].innerText === cells[c].innerText
    );
  });
}

function checkDraw() {
  return [...cells].every((cell) => cell.innerText !== "");
}

function endGame(draw) {
  if (draw) {
    message.innerText = "empate!";
  } else {
    message.innerText = `${currentTurn} ganhou!`;
  }
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

init();
