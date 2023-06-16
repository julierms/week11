// Set up initial variables and game state
let board = ['', '', '', '', '', '', '', '', '']; 
let playerSymbol = 'X'; 
let gameEnded = false; 

// Function to handle cell click events
function handleCellClick(event) {
  const cell = event.target; 
  const index = cell.id; 

  // Check if cell is already occupied or game is over
  if (board[index] !== '' || gameEnded) { // if the cell is already occupied or the game is over, return without doing anything
    return;
  }

  // Update board and cell content
  board[index] = playerSymbol; // set the board array at the clicked index to the current player's symbol ('X' or 'O')
  cell.classList.add(playerSymbol); // add the current player's symbol as a class to the clicked cell
  cell.innerText = playerSymbol; 

  // Check to see who won with an if statement  
  if (checkForWin()) { // check if there is a winning combination on the board
    endGame(false); // call the endGame function with false to indicate there was a winner, not a draw
  } else if (checkForDraw()) { // check if the game is a draw
    endGame(true); // call the endGame function with true to indicate there was a draw
  } else {
    // Switch players and update message
    playerSymbol = playerSymbol === 'X' ? 'O' : 'X'; // switch the current player
    updateMessage(); // update with the new current player
  }
}

// Function to check for winning conditions 
function checkForWin() {
  const winningCombos = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let combo of winningCombos) { 
    const [a, b, c] = combo; // destructure the combination into individual variables
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) { // if same symbol (either 'X' or 'O'), then there is a winning combination
      return true; // return true to indicate there is a winning combination
    }
  }

  return false; // if no winning combination was found, return false
}

// Function to check for draw
function checkForDraw() {
  return board.every(cell => cell !== ''); // check if every cell on the board is occupied
}

// Function to end the game and update message
function endGame(draw) {
    gameEnded = true; // set the gameover variable to true
  const messageElement = document.getElementById('message'); // get the message element
  messageElement.innerText = draw ? "It's a draw!" : `${playerSymbol} wins!`; // set the message text to  draw/win 
}

// Function to update the message displayed on the webpage with the current player's turn
function updateMessage() {
    const messageElement = document.getElementById('message');
    // Update the message with the current player's turn
    messageElement.innerText = `It's ${playerSymbol}'s turn!`;
}

    // Function to reset the game by clearing the board
    function restartGame() {

    // Reset the board by setting each cell to an empty string
    // Reset the current player to 'X'
    playerSymbol = 'X';
    // Reset the gameover flag to false
    gameEnded = false;

    // Get all the cell elements from the webpage and reset each one
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
    // Remove the 'X' and 'O' classes from each cell
    cell.classList.remove('X', 'O');
    // Clear the text content of each cell
    cell.innerText = '';
    });

    // Update the message to show the current player's turn
    updateMessage();
    }

    // Add event listeners to each cell element and the restart button
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
    // Add a click event listener to each cell element that will call the handleCellClick function
    cell.addEventListener('click', handleCellClick);
    });

    const restartButton = document.getElementById('restart');
    
    // Add a click event listener to the restart button that will call the restartGame function
    restartButton.addEventListener('click', restartGame);

    // Initialize the message displayed on the webpage with the current player's turn
    updateMessage();
