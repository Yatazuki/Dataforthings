const easyCards = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊'];
const mediumCards = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷'];
const hardCards = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🐙', '🦋', '🦉', '🐝', '🐞', '🦗', '🦒', '🦘', '🦬', '🦙', '🦥', '🦦', '🦨', '🦡', '🐘', '🦏', '🦛', '🦌', '🐪', '🦍', '🦧', '🐅', '🐆', '🦓', '🦃', '🦩', '🦫', '🦎', '🦕', '🦖', '🐊', '🐢', '🦂', '🕷️', '🦗', '🦟', '🦋', '🐌', '🐛', '🦄', '🦮', '🐕', '🐈', '🦤', '🦢', '🦆', '🦅', '🦜', '🕊️', '🐧', '🦭', '🦈', '🐠', '🐟', '🐡', '🐋', '🐳', '🦐', '🦑', '🦞', '🦀', '🐚', '🦪', '🌺', '🌸', '🏵️', '💐', '🌷', '🌹', '🌻', '🍄'];

let gameBoard = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let bestScores = {
  easy: localStorage.getItem('memoryBestScore_easy') || '-',
  medium: localStorage.getItem('memoryBestScore_medium') || '-',
  hard: localStorage.getItem('memoryBestScore_hard') || '-'
};
let canFlip = true;
let currentDifficulty = 'easy';

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const bestScoreDisplay = document.getElementById('bestScore');

bestScoreDisplay.textContent = bestScores[currentDifficulty];
const startButton = document.getElementById('startButton');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

bestScoreDisplay.textContent = bestScore;

// Supabase best score update logic for Memory Game
let supabase = null;
document.addEventListener('DOMContentLoaded', () => {
  if (window.supabaseAuth && window.supabaseAuth.supabase) {
    supabase = window.supabaseAuth.supabase;
  }
});

async function updateMemoryBestScore(difficulty, moves) {
  const userId = localStorage.getItem('user_id');
  if (!userId || !supabase) return;
  const col = difficulty === 'easy' ? 'memory_easy' : difficulty === 'medium' ? 'memory_medium' : 'memory_hard';
  try {
    // Get the user's row in user_scores
    const { data: userScore, error: fetchError } = await supabase
      .from('user_scores')
      .select(`id, ${col}`)
      .eq('user_id', userId)
      .single();
    if (fetchError) {
      console.error('Error fetching user_scores for memory best score:', fetchError);
      return;
    }
    if (!userScore) return;
    const prev = userScore[col] || 0;
    if (prev === 0 || moves < prev) {
      const { data, error } = await supabase
        .from('user_scores')
        .update({ [col]: moves, last_updated: new Date() })
        .eq('id', userScore.id);
      if (error) {
        console.error('Error updating memory best score:', error);
      } else {
        console.log('Memory best score updated:', data);
      }
    }
  } catch (err) {
    console.error('Exception updating memory best score:', err);
  }
}

function getCardsForDifficulty(difficulty) {
  switch(difficulty) {
    case 'easy': return easyCards;
    case 'medium': return mediumCards;
    case 'hard': return hardCards;
    default: return easyCards;
  }
}

function getGridColumns(difficulty) {
  switch(difficulty) {
    case 'easy': return 3;
    case 'medium': return 6;
    case 'hard': return 12;
    default: return 3;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = '';
  board.style.display = 'grid';
  const columns = getGridColumns(currentDifficulty);
  board.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
  board.style.gap = '10px';
  board.style.margin = '0 auto';
  board.style.width = 'fit-content';
  
  gameBoard.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.cardIndex = index;
    cardElement.dataset.value = card;
    cardElement.style.width = '100px';
    cardElement.style.height = '100px';
    cardElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    cardElement.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    cardElement.style.display = 'flex';
    cardElement.style.justifyContent = 'center';
    cardElement.style.alignItems = 'center';
    cardElement.style.fontSize = '68px';
    cardElement.style.cursor = 'pointer';
    cardElement.style.transition = 'all 0.3s';
    cardElement.style.borderRadius = '15px';
    cardElement.style.backdropFilter = 'blur(10px)';
    cardElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    cardElement.style.transform = 'rotateY(180deg)';
    
    cardElement.addEventListener('click', () => flipCard(cardElement));
    board.appendChild(cardElement);
  });
}

function flipCard(card) {
  if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) return;
  
  card.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  card.style.transform = 'rotateY(0deg)';
  card.textContent = card.dataset.value;
  card.style.backdropFilter = 'blur(5px)';
  
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    canFlip = false;
    
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      matchedPairs++;
      flippedCards.forEach(card => {
        card.classList.add('matched');
        card.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
      });
      flippedCards = [];
      canFlip = true;
      
      const currentCards = getCardsForDifficulty(currentDifficulty);
      if (matchedPairs === currentCards.length) {
        setTimeout(() => {
          if (bestScores[currentDifficulty] === '-' || moves < bestScores[currentDifficulty]) {
            bestScores[currentDifficulty] = moves;
            localStorage.setItem(`memoryBestScore_${currentDifficulty}`, moves);
            updateBestScoreDisplay();
          }
          updateMemoryBestScore(currentDifficulty, moves);
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.style.backgroundColor = 'transparent';
          card.style.transform = 'rotateY(180deg)';
          card.textContent = '';
        });
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }
}

function startGame() {
  const cards = getCardsForDifficulty(currentDifficulty);
  gameBoard = shuffle([...cards, ...cards]);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  movesDisplay.textContent = moves;
  canFlip = true;
  createBoard();
}

function updateBestScoreDisplay() {
  bestScoreDisplay.textContent = bestScores[currentDifficulty];
}

difficultyInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    updateBestScoreDisplay();
    startGame();
  });
});

startButton.addEventListener('click', startGame);
startGame();
