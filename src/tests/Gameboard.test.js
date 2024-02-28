const Gameboard = require("../components/Gameboard");
const Ship = require("../components/Ship");

test("Test Gameboard methods", () => {
  const gameboard = new Gameboard(10);
  gameboard.createBoard();
  const ship = new Ship(2);
  expect(gameboard.placeShip(1, 1, ship)).toBe(true);
  expect(gameboard.recieveAttack(1, 1)).toBe(true);
});
