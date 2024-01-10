// Create Gameboard module
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

// Create createPlayer factory function
function createPlayer(name, token) {
    const getName = () => name; 
    const getToken = () => token

    return {getName, getToken};
};

// Create GameController factory function
function GameController() {
    // Ask for players name
    const playerOneName = prompt("Enter player one name: ");
    const playerTwoName = prompt("Enter player two name: ");

    // Create array of players
    const players = [];
    players.push(createPlayer(playerOneName, "X"));
    players.push(createPlayer(playerTwoName, "O"));

    const getPlayers = () => players;

    return {getPlayers};
};

const game = GameController();