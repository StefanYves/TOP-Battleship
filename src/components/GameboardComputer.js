const playerGameboard = document.getElementById("player-gameboard");

class GameboardComputer {
  constructor(size, isPlayerBoard) {
    this.size = size;
    this.ship = [];
    this.board = this.createBoard();
    this.missedAttacks = [];
    this.attackedPositions = new Set();
    this.isPlayerBoard = isPlayerBoard;

    if (isPlayerBoard) {
      this.attackedPositions = new Set(); // Separate set for each player board
    } else {
      this.attackedPositions = new Set(); // Separate set for each computer board
    }
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < this.size; i++) {
      board.push(Array(this.size).fill("-"));
    }

    return board;
  }
  placeShip(row, col, ship) {
    // Check if the position is valid
    if (row < 0 || col < 0 || row >= this.size || col >= this.size || !ship) {
      console.log("Invalid position or ship");
      return false;
    }

    // Check if there is enough space
    if (col + ship.length > this.size) {
      console.log("Not enough space");
      return false;
    }

    // Check if the position is occupied
    for (let i = 0; i < ship.length; i++) {
      if (this.board[row][col + i] !== "-") {
        console.log("Position occupied");
        return false;
      }
    }

    // Add the ship to the board
    for (let i = 0; i < ship.length; i++) {
      this.board[row][col + i] = ship;
    }

    // Push the ship to the list
    this.ship.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    // Check to see if position is valid
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
      console.log("Invalid attack position");
    }

    // Check if the position has already been attacked
    if (this.attackedPositions.has(`${row}-${col}`)) {
      console.log("Position already attacked");
      return false; // Position already attacked
    }

    // Check to see if position is occupied
    if (this.board[row][col] !== "-") {
      let ship = this.board[row][col];
      ship.hit();
      return true;
    }
    this.recordMissedAttack(row, col);
    this.attackedPositions.add(`${row}-${col}`);
    return false;
  }
  // Record a missed attack
  recordMissedAttack(row, col) {
    this.missedAttacks.push({ row, col });
  }
  allShipsSunk() {
    for (let ship of this.ship) {
      console.log(`Ship Hits: ${ship.hits}, Ship Length: ${ship.length}`);
      console.log(this.ship);
      if (!ship.isSunk()) {
        console.log("There is still one ship!");
        return false; // At least one ship is not sunk
      }
    }
    console.log("Ships are sunk!");
    return true; // All ships are sunk
  }
  printBoard(containerID, player, isPlayerBoard = true) {
    const container = document.getElementById(containerID);

    // Clear existing container
    container.innerHTML = "";

    // Create div element to hold the cells
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid", "grid-cols-10");

    // Create cells in the grid{
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = document.createElement("div");

        // Assign unique id to each cell
        cell.id = `cell-${i}-${j}`;
        cell.classList.add(
          "h-10",
          "w-10",
          "bg-gray-200",
          "border",
          "border-gray-300",
          "hover:bg-gray-300"
        );

        // Check if the cell is occupied by a ship
        if (this.board[i][j] !== "-") {
          if (isPlayerBoard) {
            cell.classList.add("ship-cell"); // Add a class to mark ship cells for player's board
          } else {
            cell.classList.remove("bg-gray-200");
            cell.classList.add("bg-blue-300"); // Add blue background for ship cells on computer's board
          }
        } else {
          cell.classList.add("bg-gray-200"); // Set background color for empty cells
        }

        gridContainer.appendChild(cell);
      }
    }
    container.appendChild(gridContainer);
  }

  simulateComputerAttacks(computer) {
    const maxAttempts = this.size * this.size;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const { row, col } = computer.generateRandomAttack();

      const positionKey = `${row}-${col}`;

      if (!this.attackedPositions.has(positionKey)) {
        const targetCell = document.getElementById(`cell-${row}-${col}`);
        targetCell.classList.add("clicked");
        targetCell.classList.remove("bg-gray-200", "bg-blue-300");
        targetCell.classList.add("bg-red-300");

        if (this.board[row][col] !== "-") {
          targetCell.classList.add("bg-red-800");
        }

        this.receiveAttack(row, col); // Process the attack
        this.attackedPositions.add(positionKey); // Add the attacked position to the set

        if (this.allShipsSunk()) {
          playerGameboard.classList.add("pointer-events-none");
          alert("Computer wins!");
        }

        return; // Exit the loop after a successful attack
      }

      attempts++;
    }

    console.log(
      "Max attempts reached without finding a valid attack position."
    );
  }

  disablePlayerGameboard() {
    const playerGameboard = document.getElementById("player-gameboard");
    playerGameboard.classList.add("pointer-events-none");
  }
}
export default GameboardComputer;
