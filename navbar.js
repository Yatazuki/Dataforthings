// Navbar injection and management
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page that should have a navbar
  const currentPage = window.location.pathname.split('/').pop();
  const excludedPages = ['index.html', 'register.html', 'login.html', ''];
  
  if (!excludedPages.includes(currentPage)) {
    // Create the navbar HTML
    const navbarHtml = `
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="dashboard.html">Yatazuki</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" id="nav-dashboard" href="dashboard.html">Dashboard</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="gamesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Games
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="gamesDropdown">
                  <li><a class="dropdown-item" id="nav-snake" href="snake.html">Snake Game</a></li>
                  <li><a class="dropdown-item" id="nav-tictactoe" href="tictactoe.html">Tic-tac-toe</a></li>
                  <li><a class="dropdown-item" id="nav-memory" href="memory.html">Memory</a></li>
                  <li><a class="dropdown-item" id="nav-clickspeed" href="clickspeed.html">Click Speed Test</a></li>
                  <li><a class="dropdown-item" id="nav-blackjack" href="blackjack.html">Blackjack</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="nav-notes" href="notes.html">Notes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="nav-profile" href="profile.html">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" id="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
    
    // Insert the navbar at the beginning of the body
    const bodyElement = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navbarHtml;
    bodyElement.insertBefore(tempDiv.firstElementChild, bodyElement.firstChild);
    
    // Set active nav item based on current page
    setActiveNavItem(currentPage);
    
    // Add logout functionality
    document.getElementById('logout').addEventListener('click', function() {
      localStorage.removeItem("user_id");
      window.location.href = "index.html";
    });
    
    // Check authentication
    checkAuthentication(currentPage);
  }
});

// Function to set the active navigation item
function setActiveNavItem(currentPage) {
  // Reset all nav links to inactive
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Set appropriate nav item to active based on current page
  if (currentPage === 'dashboard.html') {
    document.getElementById('nav-dashboard').classList.add('active');
  } else if (currentPage === 'snake.html') {
    document.getElementById('nav-snake').classList.add('active');
    document.getElementById('gamesDropdown').classList.add('active');
  } else if (currentPage === 'tictactoe.html') {
    document.getElementById('nav-tictactoe').classList.add('active');
    document.getElementById('gamesDropdown').classList.add('active');
  } else if (currentPage === 'memory.html') {
    document.getElementById('nav-memory').classList.add('active');
    document.getElementById('gamesDropdown').classList.add('active');
  } else if (currentPage === 'clickspeed.html') {
    document.getElementById('nav-clickspeed').classList.add('active');
    document.getElementById('gamesDropdown').classList.add('active');
  } else if (currentPage === 'blackjack.html') {
    document.getElementById('nav-blackjack').classList.add('active');
    document.getElementById('gamesDropdown').classList.add('active');
  } else if (currentPage === 'notes.html') {
    document.getElementById('nav-notes').classList.add('active');
  } else if (currentPage === 'profile.html') {
    document.getElementById('nav-profile').classList.add('active');
  }
}

// Function to check if user is authenticated
function checkAuthentication(currentPage) {
  const userId = localStorage.getItem('user_id');
  const authRequiredPages = [
    'dashboard.html', 'snake.html', 'tictactoe.html', 'memory.html', 
    'clickspeed.html', 'blackjack.html', 'notes.html', 'profile.html'
  ];
  
  if (authRequiredPages.includes(currentPage) && !userId) {
    document.body.innerHTML = '<div class="text-center mt-5"><h2>❌ You are not logged in.</h2><p>Redirecting to login page...</p></div>';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
} 