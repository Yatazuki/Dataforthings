
const easyCards = ['🌟', '🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎡'];
const mediumCards = [...easyCards, '🎪', '🎨', '🎭', '🎡'];
const hardCards = [...mediumCards, '🎯', '🎲', '🎮', '🌟'];

let gameBoard = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let bestScore = localStorage.getItem('memoryBestScore') || '-';
let canFlip = true;
let currentDifficulty = 'easy';

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const bestScoreDisplay = document.getElementById('bestScore');
const startButton = document.getElementById('startButton');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

bestScoreDisplay.textContent = bestScore;

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
    case 'easy': return 4;
    case 'medium': return 6;
    case 'hard': return 8;
    default: return 4;
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
  board.style.gridTemplateColumns = `repeat(${columns}, 136px)`;
  board.style.gap = '10px';
  board.style.margin = '0 auto';
  board.style.width = 'fit-content';
  
  gameBoard.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.cardIndex = index;
    cardElement.dataset.value = card;
    cardElement.style.width = '136px';
    cardElement.style.height = '136px';
    cardElement.style.backgroundColor = 'transparent';
    cardElement.style.border = '1px solid rgba(255, 255, 255, 0.5)';
    cardElement.style.display = 'flex';
    cardElement.style.justifyContent = 'center';
    cardElement.style.alignItems = 'center';
    cardElement.style.fontSize = '68px';
    cardElement.style.cursor = 'pointer';
    cardElement.style.transition = 'all 0.3s';
    cardElement.style.borderRadius = '5px';
    cardElement.style.backdropFilter = 'blur(5px)';
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
          if (bestScore === '-' || moves < bestScore) {
            bestScore = moves;
            localStorage.setItem('memoryBestScore', bestScore);
            bestScoreDisplay.textContent = bestScore;
          }
          alert(`Congratulations! You won in ${moves} moves!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.style.backgroundColor = 'rgba(128, 0, 255, 0.7)';
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

difficultyInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    startGame();
  });
});

startButton.addEventListener('click', startGame);
startGame();
