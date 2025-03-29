
const cards = ['🌟', '🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎡'];
let gameBoard = [...cards, ...cards];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let bestScore = localStorage.getItem('memoryBestScore') || '-';
let canFlip = true;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const bestScoreDisplay = document.getElementById('bestScore');
const startButton = document.getElementById('startButton');

bestScoreDisplay.textContent = bestScore;

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
  board.style.gridTemplateColumns = 'repeat(4, 80px)';
  board.style.gap = '10px';
  board.style.margin = '0 auto';
  board.style.width = 'fit-content';
  
  gameBoard.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.cardIndex = index;
    cardElement.dataset.value = card;
    cardElement.style.width = '80px';
    cardElement.style.height = '80px';
    cardElement.style.backgroundColor = 'rgba(128, 0, 255, 0.7)';
    cardElement.style.border = '2px solid rgba(255, 255, 255, 0.2)';
    cardElement.style.display = 'flex';
    cardElement.style.justifyContent = 'center';
    cardElement.style.alignItems = 'center';
    cardElement.style.fontSize = '40px';
    cardElement.style.cursor = 'pointer';
    cardElement.style.transition = 'all 0.3s';
    cardElement.style.borderRadius = '10px';
    cardElement.style.transform = 'rotateY(180deg)';
    
    cardElement.addEventListener('click', () => flipCard(cardElement));
    board.appendChild(cardElement);
  });
}

function flipCard(card) {
  if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) return;
  
  card.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
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
      
      if (matchedPairs === cards.length) {
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
  gameBoard = shuffle([...cards, ...cards]);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  movesDisplay.textContent = moves;
  canFlip = true;
  createBoard();
}

startButton.addEventListener('click', startGame);
startGame();
