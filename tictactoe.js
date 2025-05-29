const board = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('resetButton');
const gameModeInputs = document.querySelectorAll('input[name="gameMode"]');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let botEnabled = false;
let botDifficulty = 'human';

// Supabase win update logic for Tic Tac Toe
let supabase = null;

// Wait for DOMContentLoaded to get supabase from window (like snake.js)
document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseAuth && window.supabaseAuth.supabase) {
    supabase = window.supabaseAuth.supabase;
  }
});

// Show and update the Tic Tac Toe wins box
async function updateWinsBox() {
  const userId = localStorage.getItem('user_id');
  const box = document.getElementById('tictactoe-wins-box');
  const count = document.getElementById('tictactoe-wins-count');
  if (!userId || !supabase || !box || !count) {
    if (box) box.style.display = 'none';
    return;
  }
  try {
    const { data, error } = await supabase
      .from('user_scores')
      .select('tictactoe_wins')
      .eq('user_id', userId)
      .single();
    if (error || !data) {
      box.style.display = 'none';
      return;
    }
    count.textContent = data.tictactoe_wins || 0;
    box.style.display = '';
  } catch (err) {
    box.style.display = 'none';
  }
}

// Call updateWinsBox on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateWinsBox);
} else {
  updateWinsBox();
}

async function updateTicTacToeWins() {
  const userId = localStorage.getItem('user_id');
  if (!userId || !supabase) return;
  try {
    // 1. Fetch username from login table
    const { data: userData, error: userError } = await supabase
      .from('login')
      .select('username')
      .eq('user_id', userId)
      .single();
    if (userError) {
      console.error('Error fetching username:', userError);
      return;
    }
    if (!userData || !userData.username) {
      console.error('Username not found in database');
      return;
    }
    const username = userData.username;

    // 2. Check if user already has a record in user_scores
    const { data: existingData, error: fetchError } = await supabase
      .from('user_scores')
      .select('id, tictactoe_wins')
      .eq('user_id', userId)
      .single();
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching existing tictactoe_wins:', fetchError);
      return;
    }

    if (!existingData) {
      // No record: insert new row with tictactoe_wins = 1
      const { data, error } = await supabase
        .from('user_scores')
        .insert([{
          user_id: userId,
          username: username,
          snake_score: 0,
          tictactoe_wins: 1,
          memory_score: 0,
          clickspeed_score: 0,
          blackjack_score: 0,
          last_updated: new Date()
        }]);
      if (error) {
        console.error('Error inserting new tictactoe_wins row:', error);
      } else {
        console.log('New tictactoe_wins record created:', data);
      }
    } else {
      // Record exists: increment tictactoe_wins
      const { data, error } = await supabase
        .from('user_scores')
        .update({
          tictactoe_wins: (existingData.tictactoe_wins || 0) + 1,
          last_updated: new Date()
        })
        .eq('id', existingData.id);
      if (error) {
        console.error('Error updating tictactoe_wins:', error);
      } else {
        console.log('tictactoe_wins updated:', data);
      }
    }
    // Update the wins box after DB update
    updateWinsBox();
  } catch (err) {
    console.error('Exception updating tictactoe_wins:', err);
  }
}

function createBoard() {
  board.style.display = 'grid';
  board.style.gridTemplateColumns = 'repeat(3, 100px)';
  board.style.gap = '10px';
  board.style.margin = '0 auto';
  board.style.width = 'fit-content';
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    cell.style.border = '2px solid rgba(128, 0, 255, 0.3)';
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
    cell.style.fontSize = '48px';
    cell.style.fontWeight = 'bold';
    cell.style.color = '#fff';
    cell.style.cursor = 'pointer';
    cell.style.backdropFilter = 'blur(5px)';
    cell.style.boxShadow = '0 0 15px rgba(128, 0, 255, 0.2)';
    cell.style.borderRadius = '15px';
    cell.style.transition = 'all 0.3s ease';
    
    cell.addEventListener('mouseover', () => {
      if (gameBoard[i] === '' && gameActive) {
        cell.style.transform = 'scale(1.05)';
        cell.style.boxShadow = '0 0 20px rgba(128, 0, 255, 0.4)';
        cell.style.borderColor = 'rgba(128, 0, 255, 0.6)';
      }
    });
    
    cell.addEventListener('mouseout', () => {
      if (gameBoard[i] === '' && gameActive) {
        cell.style.transform = 'scale(1)';
        cell.style.boxShadow = '0 0 15px rgba(128, 0, 255, 0.2)';
        cell.style.borderColor = 'rgba(128, 0, 255, 0.3)';
      }
    });
    
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

function setStatusMessage(msg, color) {
  const status = document.getElementById('tictactoe-status');
  if (status) {
    status.textContent = msg || '';
    status.style.color = color || '#fff';
  }
}

function handleCellClick(index) {
  const cells = board.children;
  
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].style.color = currentPlayer === 'X' ? '#ff5555' : '#55ff55';
    cells[index].style.textShadow = `0 0 10px ${currentPlayer === 'X' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'}`;
    cells[index].style.transform = 'scale(1.1)';
    cells[index].style.boxShadow = `0 0 20px ${currentPlayer === 'X' ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 255, 0, 0.4)'}`;
    
    if (checkWin()) {
      setTimeout(() => {
        setStatusMessage(`Player ${currentPlayer} wins!`, currentPlayer === 'X' ? '#ff5555' : '#55ff55');
        gameActive = false;
        // Update wins in Supabase if user is logged in
        updateTicTacToeWins();
      }, 100);
      return;
    }
    
    if (checkDraw()) {
      setTimeout(() => {
        setStatusMessage("It's a draw!", '#d0b0ff');
        gameActive = false;
      }, 100);
      return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    currentPlayerDisplay.style.color = currentPlayer === 'X' ? '#ff5555' : '#55ff55';
    currentPlayerDisplay.style.textShadow = `0 0 10px ${currentPlayer === 'X' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'}`;

    setStatusMessage('', '');
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
  currentPlayerDisplay.style.color = currentPlayer === 'X' ? '#ff5555' : '#55ff55';
  currentPlayerDisplay.style.textShadow = `0 0 10px ${currentPlayer === 'X' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'}`;
  setStatusMessage('', '');
  
  const cells = board.children;
  for (let cell of cells) {
    cell.textContent = '';
    cell.style.transform = 'scale(1)';
    cell.style.boxShadow = '0 0 15px rgba(128, 0, 255, 0.2)';
    cell.style.borderColor = 'rgba(128, 0, 255, 0.3)';
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
