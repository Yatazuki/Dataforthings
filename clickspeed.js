
const clickArea = document.getElementById('clickArea');
const timeLeft = document.getElementById('timeLeft');
const currentSpeed = document.getElementById('currentSpeed');
const highScore = document.getElementById('highScore');

let clicks = 0;
let timer = null;
let gameStarted = false;
let savedHighScore = localStorage.getItem('clickSpeedHighScore') || 0;
highScore.textContent = savedHighScore;

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    clicks = 0;
    let seconds = 5;
    timeLeft.textContent = seconds;
    currentSpeed.textContent = '0';
    clickArea.textContent = 'Click!';
    
    timer = setInterval(() => {
      seconds--;
      timeLeft.textContent = seconds;
      
      if (seconds <= 0) {
        endGame();
      }
    }, 1000);
  }
}

function endGame() {
  clearInterval(timer);
  gameStarted = false;
  const finalSpeed = clicks / 5;
  currentSpeed.textContent = finalSpeed.toFixed(2);
  clickArea.textContent = 'Click here to start!';
  
  if (finalSpeed > savedHighScore) {
    savedHighScore = finalSpeed;
    localStorage.setItem('clickSpeedHighScore', finalSpeed);
    highScore.textContent = finalSpeed.toFixed(2);
  }
}

clickArea.addEventListener('click', () => {
  if (!gameStarted) {
    startGame();
  } else {
    clicks++;
    const currentCPS = clicks / (5 - parseInt(timeLeft.textContent));
    currentSpeed.textContent = currentCPS.toFixed(2);
  }
});
