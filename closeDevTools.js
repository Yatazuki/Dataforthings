// Close window when F12 is pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    event.preventDefault();
    window.close();
  }
}); 