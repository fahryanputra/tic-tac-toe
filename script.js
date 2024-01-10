// Create Gameboard factory function
const GameBoard = (function() {
    const row = 3
    const column = 3
    const board = []

    // Create 2D array for the game board
    // 2D array consists of 3 rows and 3 columns
    for(let i = 0; i < row; i++) {
        board[i] = []
        for(let j = 0; j < column; j++) {
            board[i].push(".")
        }
    }

    // Method to getting the game board
    const getBoard = () => board;

    return {getBoard};
})();

// Create GameController factory function
const GameController = function() {

};

// Create Player factory function
const Player = function() {

};