import Gameboard from "./Gameboard";
import Ship from "./Ship";
import { Player } from "./Player";
import { Computer } from "./Player";
import GameboardComputer from "./GameboardComputer";

const playerGameboard = new Gameboard(10);
const computerGameboard = new GameboardComputer(10);
const ship = new Ship(4);
const ship3block = new Ship(3);
const ship2 = new Ship(2);
const ship3 = new Ship(1);
const ship4 = new Ship(4);
const ship3block2 = new Ship(3);
const ship5 = new Ship(2);
const ship6 = new Ship(1);
const player = new Player(playerGameboard, true);
const computer = new Computer(computerGameboard, false);

placeShipRandomly(computerGameboard, ship4);
placeShipRandomly(computerGameboard, ship5);
placeShipRandomly(computerGameboard, ship6);
placeShipRandomly(computerGameboard, ship3block2);

placeShipRandomly(playerGameboard, ship);
placeShipRandomly(playerGameboard, ship2);
placeShipRandomly(playerGameboard, ship3);
placeShipRandomly(computerGameboard, ship3block);

function startGame() {
  playerGameboard.printBoard("player-gameboard", player, true);
  computerGameboard.printBoard("computer-gameboard", computer, false);
}

function placeShipRandomly(board, ship) {
  const maxAttempts = board.size * board.size; // Maximum attempts based on the number of cells on the board
  let attempts = 0;

  while (attempts < maxAttempts) {
    const randomRow = Math.floor(Math.random() * board.size);
    const randomCol = Math.floor(Math.random() * board.size);
    if (board.placeShip(randomRow, randomCol, ship)) {
      // Ship placed successfully
      return true;
    }
    attempts++;
  }

  // Max attempts reached without successful placement
  console.log("Max attempts reached, ship placement failed");
  return false;
}

export { startGame, computer, playerGameboard, computerGameboard };
