// Card deck and game state
const suits = ['♠️', '♣️', '♥️', '♦️'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cardImages = {
  '2♠️': '🂢', '3♠️': '🂣', '4♠️': '🂤', '5♠️': '🂥', '6♠️': '🂦', '7♠️': '🂧', '8♠️': '🂨', '9♠️': '🂩', '10♠️': '🂪', 'J♠️': '🂫', 'Q♠️': '🂭', 'K♠️': '🂮', 'A♠️': '🂡',
  '2♣️': '🃒', '3♣️': '🃓', '4♣️': '🃔', '5♣️': '🃕', '6♣️': '🃖', '7♣️': '🃗', '8♣️': '🃘', '9♣️': '🃙', '10♣️': '🃚', 'J♣️': '🃛', 'Q♣️': '🃝', 'K♣️': '🃞', 'A♣️': '🃑',
  '2♥️': '🂲', '3♥️': '🂳', '4♥️': '🂴', '5♥️': '🂵', '6♥️': '🂶', '7♥️': '🂷', '8♥️': '🂸', '9♥️': '🂹', '10♥️': '🂺', 'J♥️': '🂻', 'Q♥️': '🂽', 'K♥️': '🂾', 'A♥️': '🂱',
  '2♦️': '🃂', '3♦️': '🃃', '4♦️': '🃄', '5♦️': '🃅', '6♦️': '🃆', '7♦️': '🃇', '8♦️': '🃈', '9♦️': '🃉', '10♦️': '🃊', 'J♦️': '🃋', 'Q♦️': '🃍', 'K♦️': '🃎', 'A♦️': '🃁'
};

let deck = [];
let playerHand = [];
let dealerHand = [];
let balance = 1000;
let currentBet = 10;
let wins = 0;
let losses = 0;
let currentStreak = 0;
let bestStreak = 0;
let currentDifficulty = 'easy';

// DOM Elements
const gameBoard = document.getElementById('game-board');
const balanceDisplay = document.getElementById('balance');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const bestStreakDisplay = document.getElementById('bestStreak');
const startButton = document.getElementById('startButton');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
const gameStatusDisplay = document.getElementById('gameStatus');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

// Card value calculation
function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  for (let card of hand) {
    const cardValue = card.slice(0, -1);
    if (['J', 'Q', 'K'].includes(cardValue)) {
      value += 10;
    } else if (cardValue === 'A') {
      aces++;
    } else {
      value += parseInt(cardValue);
    }
  }

  // Handle aces
  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
}

// Create and shuffle deck
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push(value + suit);
    }
  }
  // Shuffle deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal a card
function dealCard(hand) {
  const card = deck.pop();
  hand.push(card);
  return card;
}

// Render hands
function renderHands() {
  gameBoard.innerHTML = '';
  
  // Dealer's hand
  const dealerHandDiv = document.createElement('div');
  dealerHandDiv.classList.add('dealer-hand', 'me-4');
  dealerHandDiv.innerHTML = `<h3>Dealer's Hand</h3><div class="hand-value" id="dealerValue"></div>`;
  
  const dealerValue = calculateHandValue(dealerHand);
  const dealerValueDisplay = dealerHandDiv.querySelector('#dealerValue');
  
  const dealerCardsDiv = document.createElement('div');
  dealerCardsDiv.classList.add('cards-container');
  
  dealerHand.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('blackjack-card');
    
    // Set color for red cards (hearts and diamonds)
    if (card.includes('♥️') || card.includes('♦️')) {
      cardElement.classList.add('red');
    } else {
      cardElement.classList.add('black');
    }
    
    // Hide first card if game is in progress and player hasn't stood yet
    if (index === 0 && playerHand.length > 0 && hitButton.disabled === false) {
      cardElement.classList.add('card-back');
      dealerValueDisplay.textContent = '';
    } else {
      const cardValue = card.slice(0, -1);
      const cardSuit = card.slice(-1);
      
      // Format card value (10 is too long, J, Q, K, A are fine)
      let displayValue = cardValue;
      
      // Center big symbol
      const symbolSpan = document.createElement('span');
      symbolSpan.classList.add('card-symbol');
      symbolSpan.textContent = cardImages[card] || card;
      cardElement.appendChild(symbolSpan);
      
      // Top left corner
      const topLeftValue = document.createElement('div');
      topLeftValue.classList.add('card-value', 'top-left');
      
      const valueSpan = document.createElement('span');
      valueSpan.textContent = displayValue;
      topLeftValue.appendChild(valueSpan);
      
      const suitSpan = document.createElement('span');
      suitSpan.classList.add('suit-small');
      suitSpan.textContent = cardSuit;
      topLeftValue.appendChild(suitSpan);
      
      cardElement.appendChild(topLeftValue);
      
      // Bottom right corner
      const bottomRightValue = document.createElement('div');
      bottomRightValue.classList.add('card-value', 'bottom-right');
      
      const valueSpan2 = document.createElement('span');
      valueSpan2.textContent = displayValue;
      bottomRightValue.appendChild(valueSpan2);
      
      const suitSpan2 = document.createElement('span');
      suitSpan2.classList.add('suit-small');
      suitSpan2.textContent = cardSuit;
      bottomRightValue.appendChild(suitSpan2);
      
      cardElement.appendChild(bottomRightValue);
      
      dealerValueDisplay.textContent = `Value: ${dealerValue}`;
    }
    
    dealerCardsDiv.appendChild(cardElement);
  });
  
  dealerHandDiv.appendChild(dealerCardsDiv);
  gameBoard.appendChild(dealerHandDiv);

  // Player's hand
  const playerHandDiv = document.createElement('div');
  playerHandDiv.classList.add('player-hand');
  playerHandDiv.innerHTML = `<h3>Your Hand</h3><div class="hand-value">Value: ${calculateHandValue(playerHand)}</div>`;
  
  const playerCardsDiv = document.createElement('div');
  playerCardsDiv.classList.add('cards-container');
  
  playerHand.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('blackjack-card');
    
    // Set color for red cards (hearts and diamonds)
    if (card.includes('♥️') || card.includes('♦️')) {
      cardElement.classList.add('red');
    } else {
      cardElement.classList.add('black');
    }
    
    const cardValue = card.slice(0, -1);
    const cardSuit = card.slice(-1);
    
    // Format card value (10 is too long, J, Q, K, A are fine)
    let displayValue = cardValue;
    
    // Center big symbol
    const symbolSpan = document.createElement('span');
    symbolSpan.classList.add('card-symbol');
    symbolSpan.textContent = cardImages[card] || card;
    cardElement.appendChild(symbolSpan);
    
    // Top left corner
    const topLeftValue = document.createElement('div');
    topLeftValue.classList.add('card-value', 'top-left');
    
    const valueSpan = document.createElement('span');
    valueSpan.textContent = displayValue;
    topLeftValue.appendChild(valueSpan);
    
    const suitSpan = document.createElement('span');
    suitSpan.classList.add('suit-small');
    suitSpan.textContent = cardSuit;
    topLeftValue.appendChild(suitSpan);
    
    cardElement.appendChild(topLeftValue);
    
    // Bottom right corner
    const bottomRightValue = document.createElement('div');
    bottomRightValue.classList.add('card-value', 'bottom-right');
    
    const valueSpan2 = document.createElement('span');
    valueSpan2.textContent = displayValue;
    bottomRightValue.appendChild(valueSpan2);
    
    const suitSpan2 = document.createElement('span');
    suitSpan2.classList.add('suit-small');
    suitSpan2.textContent = cardSuit;
    bottomRightValue.appendChild(suitSpan2);
    
    cardElement.appendChild(bottomRightValue);
    
    playerCardsDiv.appendChild(cardElement);
  });
  
  playerHandDiv.appendChild(playerCardsDiv);
  gameBoard.appendChild(playerHandDiv);
}

// Start/reset game
function startGame() {
  // Set bet based on difficulty
  switch(currentDifficulty) {
    case 'easy': currentBet = 10; break;
    case 'medium': currentBet = 50; break;
    case 'hard': currentBet = 100; break;
    default: currentBet = 10;
  }

  // Reset game state
  createDeck();
  playerHand = [];
  dealerHand = [];
  
  // Deal initial cards
  dealCard(playerHand);
  dealCard(dealerHand);
  dealCard(playerHand);
  dealCard(dealerHand);
  
  // Render hands
  renderHands();
  
  // Enable/disable buttons
  hitButton.disabled = false;
  standButton.disabled = false;
  
  // Clear game status
  gameStatusDisplay.textContent = '';
  
  // Check for initial blackjack
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (playerValue === 21) {
    endGame('blackjack');
  }
}

// Hit (take another card)
function hit() {
  dealCard(playerHand);
  renderHands();
  
  const playerValue = calculateHandValue(playerHand);
  
  if (playerValue > 21) {
    endGame('bust');
  }
}

// Stand (dealer's turn)
function stand() {
  // Disable buttons
  hitButton.disabled = true;
  standButton.disabled = true;
  
  // Reveal dealer's first card
  renderHands();
  
  // Dealer draws until 17 or higher
  while (calculateHandValue(dealerHand) < 17) {
    dealCard(dealerHand);
  }
  
  renderHands();
  
  // Determine winner
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (dealerValue > 21 || playerValue > dealerValue) {
    endGame('win');
  } else if (playerValue < dealerValue) {
    endGame('lose');
  } else {
    endGame('push');
  }
}

// End game logic
function endGame(result) {
  // Disable buttons
  hitButton.disabled = true;
  standButton.disabled = true;
  
  // Reveal dealer's hand
  renderHands();
  
  // Update game state and display
  switch(result) {
    case 'blackjack':
      balance += currentBet * 1.5;
      wins++;
      currentStreak++;
      gameStatusDisplay.textContent = 'Blackjack! You win!';
      gameStatusDisplay.style.color = '#00ff00';
      break;
    case 'win':
      balance += currentBet;
      wins++;
      currentStreak++;
      gameStatusDisplay.textContent = 'You win!';
      gameStatusDisplay.style.color = '#00ff00';
      break;
    case 'lose':
      balance -= currentBet;
      losses++;
      currentStreak = 0;
      gameStatusDisplay.textContent = 'Dealer wins!';
      gameStatusDisplay.style.color = '#ff0000';
      break;
    case 'bust':
      balance -= currentBet;
      losses++;
      currentStreak = 0;
      gameStatusDisplay.textContent = 'Bust! You lose!';
      gameStatusDisplay.style.color = '#ff0000';
      break;
    case 'push':
      gameStatusDisplay.textContent = 'Push! No money exchanged.';
      gameStatusDisplay.style.color = '#ffffff';
      break;
  }
  
  // Update best streak
  bestStreak = Math.max(bestStreak, currentStreak);
  
  // Update displays
  balanceDisplay.textContent = balance;
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
  bestStreakDisplay.textContent = bestStreak;
  
  // Check for game over
  if (balance <= 0) {
    gameStatusDisplay.textContent = 'Game Over! You ran out of money.';
    startButton.disabled = true;
  }
}

// Set up event listeners
difficultyInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
  });
});

startButton.addEventListener('click', startGame);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
  // Initialize displays
  balanceDisplay.textContent = balance;
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
  bestStreakDisplay.textContent = bestStreak;

  // Set default difficulty
  document.getElementById('easy').checked = true;
  
  // Initialize game
  startGame();
}); 