// Close window when F12 is pressed or DevTools are detected
document.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    event.preventDefault();
    window.close();
  }
});

// Method 1: Detect DevTools via window size
let devToolsDetected = false;
const threshold = 160;
const checkDevTools = function() {
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  
  if (widthThreshold || heightThreshold) {
    if (!devToolsDetected) {
      devToolsDetected = true;
      window.close();
    }
  } else {
    devToolsDetected = false;
  }
};

// Method 2: Use console.clear detection
const originalClear = console.clear;
console.clear = function() {
  if (new Error().stack.includes('devtools://')) {
    window.close();
  }
  originalClear.apply(console, arguments);
};

// Method 3: Use debugger statement to detect if stepping through code
function detectDebugger() {
  const startTime = new Date().getTime();
  debugger;
  const endTime = new Date().getTime();
  if (endTime - startTime > 100) {
    window.close();
  }
}

// Check for DevTools periodically
window.addEventListener('resize', checkDevTools);
setInterval(checkDevTools, 1000);
setInterval(detectDebugger, 1000); 