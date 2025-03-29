
const board = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('resetButton');
const gameModeInputs = document.querySelectorAll('input[name="gameMode"]');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let botEnabled = false;
let botDifficulty = 'human';

function createBoard() {
  board.style.display = 'grid';
  board.style.gridTemplateColumns = 'repeat(3, 80px)';
  board.style.gap = '5px';
  board.style.margin = '0 auto';
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '80px';
    cell.style.height = '80px';
    cell.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    cell.style.border = '2px solid rgba(255, 255, 255, 0.2)';
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
    cell.style.fontSize = '40px';
    cell.style.color = '#fff';
    cell.style.cursor = 'pointer';
    cell.style.backdropFilter = 'blur(5px)';
    cell.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.1)';
    cell.style.borderRadius = '15px';
    
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
  }
}

function getEmptyCells() {
  return gameBoard.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);
}

function makeRandomMove() {
  const emptyCells = getEmptyCells();
  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getBestMove() {
  let bestScore = -Infinity;
  let bestMove;
  
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = 'O';
      let score = minimax(gameBoard, 0, false);
      gameBoard[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -1 : 1;
  }
  if (checkDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function makeBotMove() {
  let moveIndex;
  
  switch (botDifficulty) {
    case 'easy':
      moveIndex = makeRandomMove();
      break;
    case 'medium':
      moveIndex = Math.random() < 0.5 ? makeRandomMove() : getBestMove();
      break;
    case 'hard':
      moveIndex = getBestMove();
      break;
    default:
      return;
  }
  
  if (moveIndex !== null && moveIndex !== undefined) {
    setTimeout(() => handleCellClick(moveIndex), 500);
  }
}

function handleCellClick(index) {
  const cells = board.children;
  
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    if (checkWin()) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
      }, 100);
      return;
    }
    
    if (checkDraw()) {
      setTimeout(() => {
        alert("It's a draw!");
        gameActive = false;
      }, 100);
      return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;

    if (botDifficulty !== 'human' && currentPlayer === 'O' && gameActive) {
      makeBotMove();
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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
  currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  currentPlayerDisplay.textContent = currentPlayer;
  
  const cells = board.children;
  for (let cell of cells) {
    cell.textContent = '';
  }

  if (botDifficulty !== 'human' && currentPlayer === 'O') {
    makeBotMove();
  }
}

gameModeInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    botDifficulty = e.target.value;
    resetGame();
  });
});

resetButton.addEventListener('click', resetGame);
createBoard();
