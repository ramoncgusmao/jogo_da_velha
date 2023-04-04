document.addEventListener('DOMContentLoaded', function() {
  const squares = document.querySelectorAll('.square');
  const restartBtn = document.querySelector('.reset');
  const resultMsg = document.querySelector('.result');
  const currentPlayer = document.querySelector('#currentPlayer');
  let board;
  let currentTurn = 'X';
  
  startGame();
  
  function startGame() {
    board = Array.from(Array(9).keys());
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerText = '';
      squares[i].addEventListener('click', handleClick, { once: true });
      squares[i].classList.remove('winner');
    }
    setBoardHoverClass();
    resultMsg.classList.remove('show');
    currentTurn = 'X';
    currentPlayer.innerText = currentTurn;
  }
  
  function handleClick(e) {
    const square = e.target;
    const index = square.dataset.index;
    if (isValidMove(index)) {
      square.innerText = currentTurn;
      board[index] = currentTurn;
      if (checkWin()) {
        endGame(false);
      } else if (checkDraw()) {
        endGame(true);
      } else {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        currentPlayer.innerText = currentTurn;
        setBoardHoverClass();
      }
    }
  }
  
  function endGame(draw) {
    if (draw) {
      resultMsg.innerText = 'Draw!';
    } else {
      resultMsg.innerText = `${currentTurn} Wins!`;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === currentTurn) {
          squares[i].classList.add('winner');
        }
      }
    }
    resultMsg.classList.add('show');
  }
  
  function setBoardHoverClass() {
    squares.forEach((square) => {
      square.innerText = "";
    });
  }
  
  function checkWin() {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winCombinations.some(combination => {
      return combination.every(index => {
        return board[index] === currentTurn;
      });
    });
  }
  
  function checkDraw() {
    return board.every(cell => {
      return cell === 'X' || cell === 'O';
    });
  }
  
  function isValidMove(index) {
    return typeof board[index] === 'number';
  }
  
  restartBtn.addEventListener('click', startGame);
});
