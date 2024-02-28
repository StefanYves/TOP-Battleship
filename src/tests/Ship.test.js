const Ship = require("../components/Ship");

test("Test Ships methods", () => {
  const smallShip = new Ship(2);
  smallShip.hit();
  expect(smallShip.hit()).toEqual(2);
  expect(smallShip.isSunk()).toBe(true);
});
