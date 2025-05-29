# Yatazuki Web Application - Complete Documentation

## Project Overview
Yatazuki is a comprehensive web gaming platform featuring user authentication, multiple games, and note-taking capabilities. The platform is built with modern web technologies and follows a client-server architecture.

## System Architecture

### Frontend Stack
- HTML5 & CSS3
- Vanilla JavaScript
- Bootstrap 5.3.0
- Three.js (for sphere visualization)

### Backend Stack
- Node.js with Express
- PostgreSQL database
- RESTful API architecture

## Features

### 1. Authentication System
- User registration and login
- Session management via localStorage
- API key validation
- Secure password handling

### 2. Games Collection
- Snake Game: Classic snake gameplay with score tracking
- Tic-tac-toe: Player vs Bot with multiple difficulty levels
- Memory Game: Card matching with difficulty settings
- Click Speed Test: CPS (Clicks Per Second) measurement

### 3. Notes System
- Personal notes creation and management
- Real-time updates
- Timestamp tracking
- User-specific storage

## Database Schema

```sql
-- Users table
CREATE TABLE logins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Global notes table
CREATE TABLE global_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Personal notes table
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Game scores table
CREATE TABLE game_scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES logins(id) ON DELETE CASCADE,
  game_type VARCHAR(20) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## File Structure & Explanations

### 1. Backend Files

#### backend.js
- Main server file
- Handles API routes
- Database connections
- Authentication middleware
- Note: Contains server configuration and API endpoints

#### schema.sql
- Database schema definitions
- Table creation scripts
- Index definitions for optimization

### 2. Frontend Core Files

#### index.html
- Login page
- Entry point of the application
- Authentication form

#### register.html
- User registration page
- New account creation form

#### dashboard.html
- Main user interface after login
- Navigation to all features
- User overview

### 3. Game Files

#### snake.js & snake.html
- Classic Snake game implementation
- Canvas-based rendering
- Score tracking
- Mobile-responsive controls

#### tictactoe.js & tictactoe.html
- Tic-tac-toe game
- AI opponent with multiple difficulties
- Clean UI implementation

#### memory.js & memory.html
- Memory card matching game
- Multiple difficulty levels
- Score tracking system

### 4. Utility Files

#### scripts.js
- Core JavaScript functionality
- Authentication handling
- API interactions
- Common utilities

#### styles.css
- Global styling
- Responsive design rules
- Theme definitions
- Component styles

### 5. Note System Files

#### notes.js & notes.html
- Note management system
- CRUD operations
- Real-time updates

## API Endpoints

### Authentication
```
POST /login    - User login
POST /register - New user registration
```

### Notes
```
GET    /notes     - Retrieve notes
POST   /notes     - Create note
PUT    /notes/:id - Update note
DELETE /notes/:id - Delete note
```

## Configuration Files

### package.json
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "pg": "^8.14.1"
  }
}
```

### .replit
- Deployment configuration
- Run commands
- Git workflow settings

## Security Features

1. API Key Authentication
   - Required for all API requests
   - Configured via environment variables

2. Password Security
   - Hashed storage
   - Secure transmission

3. CORS Configuration
   - Origin restriction
   - Method limitations
   - Credential handling

## Environment Configuration
```javascript
const API_URL = 'https://5cb110af-956e-4abc-9ac8-0a402e499a2e-00-gksjpc3ojn7k.spock.replit.dev';
const API_KEY = 'yatazuki.dev';
```

## Complete Code Listings

[Full code listings for each file are included in the repository]

## Git Integration
- Multiple workflow configurations
- Automated commit messages
- Push to main branch setup

## Deployment
- Configured for Replit hosting
- Production-ready setup
- Automatic HTTPS support

## Best Practices
1. Code Organization
   - Modular structure
   - Clear separation of concerns
   - Consistent naming conventions

2. Security
   - API key validation
   - Input sanitization
   - Secure data transmission

3. Performance
   - Optimized database queries
   - Efficient client-side code
   - Resource caching

## Future Enhancements
1. User profile customization
2. Additional games
3. Multiplayer functionality
4. Global leaderboards
5. Social features

## Maintenance
- Regular database backups
- API key rotation
- Performance monitoring
- Security updates
