
const target = document.getElementById('target');
const startButton = document.getElementById('startButton');
const bestTimeDisplay = document.getElementById('bestTime');

let bestTime = localStorage.getItem('reactionBestTime') || '-';
let timeoutId = null;
let startTime = null;
let isWaiting = false;
let isReady = false;

bestTimeDisplay.textContent = bestTime;

function getRandomDelay() {
  return Math.random() * 3000 + 1000; // Random delay between 1-4 seconds
}

function setTargetState(state) {
  target.className = `reaction-box ${state}`;
  switch(state) {
    case 'waiting':
      target.textContent = 'Wait...';
      break;
    case 'ready':
      target.textContent = 'Click!';
      break;
    case 'tooSoon':
      target.textContent = 'Too Soon!';
      break;
  }
}

function startTest() {
  startButton.disabled = true;
  setTargetState('waiting');
  isWaiting = true;
  isReady = false;
  
  timeoutId = setTimeout(() => {
    setTargetState('ready');
    startTime = Date.now();
    isWaiting = false;
    isReady = true;
  }, getRandomDelay());
}

function handleClick() {
  if (!isWaiting && !isReady) return;
  
  if (isWaiting) {
    clearTimeout(timeoutId);
    setTargetState('tooSoon');
    isWaiting = false;
    startButton.disabled = false;
    return;
  }
  
  if (isReady) {
    const reactionTime = Date.now() - startTime;
    if (bestTime === '-' || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem('reactionBestTime', bestTime);
      bestTimeDisplay.textContent = bestTime;
    }
    
    target.textContent = `${reactionTime} ms`;
    target.className = 'reaction-box result';
    isReady = false;
    startButton.disabled = false;
  }
}

target.addEventListener('click', handleClick);
startButton.addEventListener('click', startTest);

// Add styles to the page
const style = document.createElement('style');
style.textContent = `
.reaction-box {
  width: 300px;
  height: 300px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.1s;
  color: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.reaction-box.waiting {
  background-color: rgba(255, 0, 0, 0.5);
}

.reaction-box.ready {
  background-color: rgba(0, 255, 0, 0.5);
}

.reaction-box.tooSoon {
  background-color: rgba(255, 165, 0, 0.5);
}

.reaction-box.result {
  background-color: rgba(0, 0, 255, 0.5);
}
`;
document.head.appendChild(style);
