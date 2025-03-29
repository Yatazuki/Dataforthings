
const board = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create game board
function createBoard() {
  board.style.display = 'grid';
  board.style.gridTemplateColumns = 'repeat(3, 100px)';
  board.style.gap = '5px';
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    cell.style.border = '2px solid rgba(255, 255, 255, 0.8)';
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
    cell.style.fontSize = '40px';
    cell.style.color = '#fff';
    cell.style.cursor = 'pointer';
    
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
  }
}

function handleCellClick(index) {
  const cells = board.children;
  
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      gameActive = false;
      return;
    }
    
    if (checkDraw()) {
      alert("It's a draw!");
      gameActive = false;
      return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' &&
           gameBoard[a] === gameBoard[b] &&
           gameBoard[a] === gameBoard[c];
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = currentPlayer;
  
  const cells = board.children;
  for (let cell of cells) {
    cell.textContent = '';
  }
}

resetButton.addEventListener('click', resetGame);
createBoard();
