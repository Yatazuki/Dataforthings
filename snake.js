// Import supabase from the window object
// (This is set by the snake.html script that imports auth.js)
let supabase = null;

// Wait for the DOM to load before accessing window.supabaseAuth
document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseAuth && window.supabaseAuth.supabase) {
    supabase = window.supabaseAuth.supabase;
    console.log('Supabase client loaded successfully');
  } else {
    console.error('Supabase client not found in window.supabaseAuth');
  }
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startButton = document.getElementById('startButton');

let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = 10;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval = null;
let isGameRunning = false;
let userId = null;
let username = null;

highScoreElement.textContent = highScore;

// Try to get user information
async function getUserInfo() {
  userId = localStorage.getItem('user_id');
  username = localStorage.getItem('username');
  
  // If we have a userId but no supabase client, still show the username
  if (userId && username) {
    const playerInfoEl = document.getElementById('playerInfo');
    if (playerInfoEl) {
      playerInfoEl.textContent = `Playing as: ${username}`;
    }
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * 40) * 10;
  food.y = Math.floor(Math.random() * 40) * 10;
}

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = '#bf80ff'; // Light purple color
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}

function drawFood() {
  ctx.fillStyle = '#FFFFFF'; // White color
  ctx.fillRect(food.x, food.y, 10, 10);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  
  if(head.x === food.x && head.y === food.y) {
    score += 10;
    scoreElement.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }
  
  if(head.x < 0 || head.x > 390 || head.y < 0 || head.y > 390) {
    alert(`Game Over!\nYour Score: ${score}\nHigh Score: ${highScore}`);
    gameOver();
  }
  
  for(let i = 1; i < snake.length; i++) {
    if(head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

async function saveScoreToDatabase() {
  // Only save if we have a userId, supabase client, and score > 0
  if (userId && supabase && score > 0) {
    console.log('Attempting to save score to database:', {userId, score});
    try {
      // First, check if the user already has a high score for snake
      const { data: existingScores, error: fetchError } = await supabase
        .from('game_scores')
        .select('id, score')
        .eq('user_id', userId)
        .eq('game_type', 'snake')
        .order('score', { ascending: false })
        .limit(1);
        
      if (fetchError) {
        console.error('Error fetching existing score:', fetchError);
        return;
      }
      
      const existingHighScore = existingScores && existingScores.length > 0 ? existingScores[0] : null;
      
      if (!existingHighScore) {
        // User doesn't have a score yet, create one
        const { data, error } = await supabase
          .from('game_scores')
          .insert([{
            user_id: userId,
            game_type: 'snake',
            score: score
          }]);
          
        if (error) {
          console.error('Error inserting new score:', error);
        } else {
          console.log('New high score record created:', data);
        }
      } else if (score > existingHighScore.score) {
        // User has a score but the new score is higher, update it
        const { data, error } = await supabase
          .from('game_scores')
          .update({
            score: score,
            created_at: new Date()
          })
          .eq('id', existingHighScore.id);
          
        if (error) {
          console.error('Error updating score:', error);
        } else {
          console.log('High score updated:', data);
        }
      } else {
        console.log('Score not saved as it\'s not a new high score');
      }
      
      // Reload the leaderboard
      if (typeof window.loadLeaderboard === 'function') {
        setTimeout(window.loadLeaderboard, 500);
      } else {
        console.error('loadLeaderboard function not found in window object');
      }
    } catch (err) {
      console.error('Error saving score:', err);
    }
  } else {
    console.warn('Not saving score - missing user ID or supabase client, or score is 0', {userId, hasSupabase: !!supabase, score});
  }
}

async function gameOver() {
  if(score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    highScoreElement.textContent = highScore;
  }
  
  // Save score to database if score is greater than 0
  if (score > 0) {
    await saveScoreToDatabase();
  }
  
  score = 0;
  scoreElement.textContent = score;
  snake = [{x: 200, y: 200}];
  dx = 10;
  dy = 0;
  clearInterval(gameInterval);
  isGameRunning = false;
  startButton.textContent = 'Start Game';
  startButton.classList.remove('running');
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

function startGame() {
  if(!isGameRunning) {
    isGameRunning = true;
    generateFood();
    gameInterval = setInterval(gameLoop, 100);
    startButton.textContent = 'Game Running';
    startButton.classList.add('running');
    canvas.focus();
  }
}

function handleKeyDown(e) {
  if(!isGameRunning) return;
  
  e.preventDefault();
  if(e.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -10;
  }
  if(e.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = 10;
  }
  if(e.key === 'ArrowLeft' && dx === 0) {
    dx = -10;
    dy = 0;
  }
  if(e.key === 'ArrowRight' && dx === 0) {
    dx = 10;
    dy = 0;
  }
}

canvas.addEventListener('click', startGame);
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyDown);

// Mobile controls
document.getElementById('upBtn')?.addEventListener('click', () => {
  if (dy === 0 && isGameRunning) {
    dx = 0;
    dy = -10;
  }
});

document.getElementById('downBtn')?.addEventListener('click', () => {
  if (dy === 0 && isGameRunning) {
    dx = 0;
    dy = 10;
  }
});

document.getElementById('leftBtn')?.addEventListener('click', () => {
  if (dx === 0 && isGameRunning) {
    dx = -10;
    dy = 0;
  }
});

document.getElementById('rightBtn')?.addEventListener('click', () => {
  if (dx === 0 && isGameRunning) {
    dx = 10;
    dy = 0;
  }
});

// Initialize when the script loads
getUserInfo();
