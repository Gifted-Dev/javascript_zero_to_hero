# Project 1: Number Guessing Game
## Apply Your JavaScript Fundamentals

Build a console-based number guessing game that demonstrates all the concepts you've learned in Part 1.

## 🎯 Project Objectives

By completing this project, you will:
- ✅ Use variables and constants appropriately
- ✅ Implement control structures (if/else, loops)
- ✅ Create and use functions
- ✅ Work with user input and validation
- ✅ Practice debugging and testing

---

## 📋 Requirements

### Core Features (Must Implement)
1. **Generate a random number** between 1 and 100
2. **Track number of attempts** the player has made
3. **Provide feedback** after each guess (too high, too low, correct)
4. **Input validation** - handle invalid inputs gracefully
5. **Game end conditions** - win or maximum attempts reached
6. **Play again functionality** - allow multiple rounds

### Bonus Features (For Extra Challenge)
7. **Difficulty levels** - Easy (1-50), Medium (1-100), Hard (1-500)
8. **High score tracking** - remember best scores across sessions
9. **Hint system** - provide hints after certain number of wrong guesses
10. **Statistics** - track games played, win rate, average attempts

---

## 🏗️ Project Structure

Create these files:
```
projects/number-guessing-game/
├── game.js          # Main game logic
├── utils.js         # Utility functions
├── index.html       # Simple HTML to run the game
└── README.md        # Your project documentation
```

---

## 📝 Step-by-Step Implementation Guide

### Step 1: Setup and Basic Structure
```javascript
// game.js - Start with this basic structure

// Game configuration
const GAME_CONFIG = {
    MIN_NUMBER: 1,
    MAX_NUMBER: 100,
    MAX_ATTEMPTS: 7
};

// Game state
let gameState = {
    targetNumber: 0,
    attempts: 0,
    isGameActive: false,
    playerGuesses: []
};

// Main game functions
function startNewGame() {
    // TODO: Initialize new game
}

function makeGuess(playerGuess) {
    // TODO: Process player's guess
}

function endGame(won) {
    // TODO: Handle game end
}

function playAgain() {
    // TODO: Reset for new game
}
```

### Step 2: Implement Core Game Logic
```javascript
// TODO: Complete these functions

function generateRandomNumber(min, max) {
    // Generate random number between min and max (inclusive)
}

function validateInput(input) {
    // Check if input is a valid number within range
    // Return object: { isValid: boolean, error: string, number: number }
}

function provideFeedback(guess, target, attempts) {
    // Return appropriate feedback message
    // Consider: too high, too low, correct, attempts remaining
}

function isGameWon(guess, target) {
    // Check if player has won
}

function isGameLost(attempts, maxAttempts) {
    // Check if player has lost (max attempts reached)
}
```

### Step 3: Add User Interface Functions
```javascript
// TODO: Implement user interaction

function displayWelcomeMessage() {
    // Show game introduction and rules
}

function displayGameState() {
    // Show current game status (attempts, previous guesses, etc.)
}

function getPlayerInput() {
    // Get input from player (use prompt() for console version)
    // In browser: use input field
}

function displayMessage(message, type = 'info') {
    // Display messages to player
    // Types: 'info', 'success', 'error', 'warning'
}
```

### Step 4: Implement Game Flow
```javascript
// TODO: Main game loop

function runGame() {
    displayWelcomeMessage();
    
    do {
        startNewGame();
        
        while (gameState.isGameActive) {
            displayGameState();
            const input = getPlayerInput();
            const validation = validateInput(input);
            
            if (validation.isValid) {
                const result = makeGuess(validation.number);
                displayMessage(result.message, result.type);
                
                if (result.gameEnded) {
                    endGame(result.won);
                }
            } else {
                displayMessage(validation.error, 'error');
            }
        }
        
    } while (playAgain());
    
    displayMessage("Thanks for playing! 🎮");
}
```

---

## 🎨 Enhanced Features Implementation

### Difficulty Levels
```javascript
const DIFFICULTY_LEVELS = {
    easy: { min: 1, max: 50, attempts: 10 },
    medium: { min: 1, max: 100, attempts: 7 },
    hard: { min: 1, max: 500, attempts: 10 }
};

function selectDifficulty() {
    // TODO: Let player choose difficulty
    // Return selected difficulty configuration
}
```

### High Score System
```javascript
function saveHighScore(attempts, difficulty) {
    // TODO: Save high score to localStorage
    // Track best score for each difficulty level
}

function getHighScores() {
    // TODO: Retrieve high scores from localStorage
    // Return object with high scores for each difficulty
}

function displayHighScores() {
    // TODO: Show current high scores
}
```

### Statistics Tracking
```javascript
const gameStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    totalAttempts: 0,
    bestScore: Infinity,
    averageAttempts: 0
};

function updateStats(won, attempts) {
    // TODO: Update game statistics
}

function calculateWinRate() {
    // TODO: Calculate and return win percentage
}

function displayStats() {
    // TODO: Show player statistics
}
```

---

## 🧪 Testing Your Game

### Test Cases to Verify

1. **Input Validation**
   - Test with non-numbers ("abc", "", null)
   - Test with numbers outside range (-5, 150)
   - Test with decimal numbers (45.7)

2. **Game Logic**
   - Test winning condition (correct guess)
   - Test losing condition (max attempts reached)
   - Test feedback messages (too high, too low)

3. **Edge Cases**
   - First guess is correct
   - Last attempt is correct
   - Repeated guesses

4. **User Experience**
   - Game flow feels natural
   - Messages are clear and helpful
   - Play again functionality works

### Sample Test Function
```javascript
function runTests() {
    console.log("Running tests...");
    
    // Test random number generation
    for (let i = 0; i < 100; i++) {
        const num = generateRandomNumber(1, 10);
        console.assert(num >= 1 && num <= 10, `Random number ${num} out of range`);
    }
    
    // Test input validation
    console.assert(validateInput("50").isValid === true, "Valid input failed");
    console.assert(validateInput("abc").isValid === false, "Invalid input passed");
    console.assert(validateInput("150").isValid === false, "Out of range input passed");
    
    console.log("All tests passed! ✅");
}
```

---

## 🎯 Sample Output

```
🎯 Welcome to the Number Guessing Game! 🎯

Rules:
- I'm thinking of a number between 1 and 100
- You have 7 attempts to guess it
- I'll tell you if your guess is too high or too low
- Good luck! 🍀

Difficulty: Medium (1-100, 7 attempts)
High Score: 4 attempts

Game 1 - Attempt 1/7
Previous guesses: []
Enter your guess: 50
Too high! Try a lower number.

Game 1 - Attempt 2/7  
Previous guesses: [50]
Enter your guess: 25
Too low! Try a higher number.

Game 1 - Attempt 3/7
Previous guesses: [50, 25]
Enter your guess: 37
Too low! Try a higher number.

Game 1 - Attempt 4/7
Previous guesses: [50, 25, 37]
Enter your guess: 43
🎉 Congratulations! You guessed it in 4 attempts! 🎉

New High Score! 🏆

Play again? (y/n): y
```

---

## 🚀 Extension Ideas

Once you complete the basic game, try these enhancements:

1. **Visual Interface**: Create a web version with HTML/CSS
2. **Sound Effects**: Add audio feedback for wins/losses
3. **Multiplayer**: Allow two players to take turns
4. **Custom Ranges**: Let players set their own number ranges
5. **Themed Versions**: Create themed variants (guess the temperature, year, etc.)
6. **AI Opponent**: Create a computer player that learns from patterns

---

## 📝 Project Submission

When complete, your project should include:

1. **Working code** that runs without errors
2. **README.md** with:
   - How to run the game
   - Features implemented
   - Challenges faced and solutions
   - What you learned

3. **Code comments** explaining your logic
4. **Test results** showing you've verified functionality

---

## 🎖️ Evaluation Criteria

**Beginner Level (Pass)**
- ✅ Game generates random numbers
- ✅ Accepts user input and provides feedback
- ✅ Tracks attempts and ends game appropriately
- ✅ Basic input validation

**Intermediate Level (Good)**
- ✅ All beginner requirements
- ✅ Play again functionality
- ✅ Good user experience and clear messages
- ✅ Proper code organization and comments

**Advanced Level (Excellent)**
- ✅ All intermediate requirements  
- ✅ Difficulty levels implemented
- ✅ High score tracking
- ✅ Statistics and additional features
- ✅ Comprehensive testing
- ✅ Clean, professional code

---

## 💡 Success Tips

1. **Start simple** - Get basic functionality working first
2. **Test frequently** - Don't wait until the end to test
3. **Use console.log()** - Debug by printing values
4. **Handle errors gracefully** - Think about what could go wrong
5. **Make it fun** - Add personality with emojis and engaging messages
6. **Get feedback** - Have others play your game

Remember: **This project combines everything you've learned. Take your time and make it awesome!** 🌟

Good luck, and have fun building your first JavaScript project! 🎮
