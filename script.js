// Create Gameboard module
const GameBoard = (function() {
    const size = 3
    const board = []

    // Create 2D array for the game board
    // 2D array consists of 3 rows and 3 columns
    for(let i = 0; i < size; i++) {
        board[i] = []
        for(let j = 0; j < size; j++) {
            board[i].push(".");
        }
    }

    // Method to getting the board size
    const getSize = () => size;
    // Method to getting the game board
    const getBoard = () => board;

    return {getSize, getBoard};
})();

function DisplayController(gameBoard) {
    const game = GameController(gameBoard);
    const container = document.querySelector(".board-container");

    for(let i = 0; i < gameBoard.length; i++) {
        for(let j = 0; j < gameBoard[i].length; j++) {
            // Display the game board
            const markerButton = document.createElement("button");

            markerButton.addEventListener("click", () => {
                // Mark the board with player marker
                markerButton.textContent = game.getActivePlayer().getMarker();
                // Run the game logic
                game.playRound(i, j);
                // Disable the button afterwards
                markerButton.disabled = true;

                // Check for winner
                if(game.getWinner() !== false) {
                    const winnerText = document.querySelector(".winner-text");
                    winnerText.textContent = game.getWinner();
                };
            });

            container.appendChild(markerButton);
        }
    }

};

// Create createPlayer factory function
function createPlayer(name, token, marker) {
    // Method to getting player name and token
    const getName = () => name; 
    const getToken = () => token;
    const getMarker = () => marker;

    return {getName, getToken, getMarker};
};

// Create GameController function
function GameController(gameBoard) {
    // Ask for players name
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    // Keep track of rounds
    let round = 0;
    // Initialize winner to false
    let winner = false;
    
    // Create array of players
    const players = [];
    players.push(createPlayer(playerOneName, 1, "X"));
    players.push(createPlayer(playerTwoName, -1, "O"));

    // Set turn between players
    let activePlayer = players[0];
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`${activePlayer.getName()}'s Turn!`);
    };

    // Game turn and update board each turn
    const updateBoard = () => {
        console.log(gameBoard);
    };

    // Gameplay function
    const playRound = (playRow, playColumn) => {
        // Get input from user to select cell
        const row = playRow;
        const column = playColumn;

        // Fill selected cell with active player's token
        gameBoard[row][column] = activePlayer.getToken();
        // Count up the round number
        round++;

        // Check if anyone is winning
        const Winner = (array) => {            
            // Check winner in horizontal and vertical direction
            function checkWinnerLateral(isRow) {
                for(let i = 0; i < array.length; i++) {
                    let sum = 0;
                    for(let j = 0; j < array[i].length; j++) {
                        isRow === true ? sum += array[i][j] : sum += array[j][i];
                    };
                    if(sum === array.length) {
                        winner = `The winner is ${players[0].getName()}!`;
                    } else if (sum === -array.length) {
                        winner = `The winner is ${players[1].getName()}!`;
                    }
                };
            }

            // Check winner in diagonal direction
            function checkWinnerDiagonal(isDown) {
                let sum = 0;
                for(let i = 0; i < array.length; i++) {
                    isDown === true ? sum += array[i][i] : sum += array[(array.length - 1) - i][i];
                }
                if(sum === array.length) {
                    winner = `The winner is ${players[0].getName()}!`;
                } else if (sum === -array.length) {
                    winner = `The winner is ${players[1].getName()}!`;
                }
            }
            
            if(round < GameBoard.getSize() ** 2) {
                // Check winning row and column
                // true = horizontal
                // false = vertical
                checkWinnerLateral(true);
                checkWinnerLateral(false);
    
                // Check winning diagonals
                // true = diagonal down
                // false = diagonal up
                checkWinnerDiagonal(true);
                checkWinnerDiagonal(false);
            } else {
                winner = "Draw!";
            }


            // Get winner's name
            const getWinner = () => winner;

            return {getWinner};
        };
        
        // Ending the game if winner found or the board is filled without a winner
        const checkWinner = (winner) => {
            if(winner === false) {
                updateBoard();
                switchPlayer();
            } else {
                updateBoard();
                console.log(winner);
            };
        };

        winner = Winner(gameBoard).getWinner();
        checkWinner(winner);
    };
    
    updateBoard();
    console.log(`${activePlayer.getName()}'s Turn!`);

    // Method to getting active player
    const getActivePlayer = () => activePlayer;
    // Method to getting the winner
    const getWinner = () => winner;
    
    return {playRound, getActivePlayer, getWinner};
};

const gameBoard = GameBoard.getBoard();
const display = DisplayController(gameBoard);