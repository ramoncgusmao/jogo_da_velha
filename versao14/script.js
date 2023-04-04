document.addEventListener('DOMContentLoaded', function() {
  const squares = document.querySelectorAll('.square');
  const restartBtn = document.querySelector('#restartBtn');
  const message = document.querySelector('#message');
  let currentPlayer = 'X';

  function reset() {
    squares.forEach((square) => {
      square.innerText = '';
      square.removeEventListener('click', handleClick);
      square.addEventListener('click', handleClick, { once: true });
      square.classList.remove('x');
      square.classList.remove('o');
    });
    currentPlayer = 'X';
    message.innerText = '';
  }

  function handleClick(e) {
    const square = e.target;
    const value = currentPlayer === 'X' ? 'X' : 'O';
    square.innerText = value;
    square.classList.add(value.toLowerCase());
    if (checkWin()) {
      message.innerText = `${value} Wins!`;
      squares.forEach((square) => {
        square.removeEventListener('click', handleClick);
      });
    } else if (checkDraw()) {
      message.innerText = "It's a Draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function checkWin() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombos.some((combo) => {
      const [a, b, c] = combo;
      return (
        squares[a].innerText &&
        squares[a].innerText === squares[b].innerText &&
        squares[a].innerText === squares[c].innerText
      );
    });
  }

  function checkDraw() {
    return [...squares].every((square) => {
      return square.innerText !== '';
    });
  }

  restartBtn.addEventListener('click', reset);

  reset();
});
