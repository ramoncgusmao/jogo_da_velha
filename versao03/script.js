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
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
let oTurn = false;

startGame();

function startGame() {
	oTurn = false;
	cellElements.forEach(cell => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();
	messageElement.innerText = '';
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = oTurn ? O_CLASS : X_CLASS;
	
	if (!isValidMove(cell)) return;
	
	placeMark(cell, currentClass);
	
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		messageElement.innerText = 'Empatou!';
	} else {
		messageElement.innerText = `${oTurn ? "O's" : "X's"} Ganhou!`;
	}
	cellElements.forEach(cell => {
		cell.removeEventListener('click', handleClick);
	});
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
	oTurn = !oTurn;
}

function setBoardHoverClass() {
	boardElement.classList.remove(X_CLASS);
	boardElement.classList.remove(O_CLASS);
	if (oTurn) {
		boardElement.classList.add(O_CLASS);
	} else {
		boardElement.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function isValidMove(cell) {
	return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS);
}
