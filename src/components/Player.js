class Player {
  constructor(gameboard) {
    this.gameboard = gameboard;
  }
  attack(row, col) {
    // Check if the attack is legal (not already hit)
    if (this.gameboard.receiveAttack(row, col)) {
      console.log(`You hit at (${row}, ${col})!`);
    } else {
      console.log(`You missed at (${row}, ${col})!`);
    }
  }
}

class Computer {
  constructor(gameboard) {
    this.gameboard = gameboard;
    this.previousAttacks = [];
  }
  // Generate random coordinates for attack
  generateRandomAttack() {
    const row = Math.floor(Math.random() * this.gameboard.size);
    const col = Math.floor(Math.random() * this.gameboard.size);

    return { row, col };
  }
  // Make randon attack
  makeRandomAttack() {
    let { row, col } = this.generateRandomAttack();

    // Ensure the attack is legal (not already hit)
    while (
      this.previousAttacks.some(
        (coord) => coord.row === row && coord.col === col
      )
    ) {
      ({ row, col } = this.generateRandomAttack());
    }

    // Record the attack
    this.previousAttacks.push({ row, col });

    // Make the attack
    // Check if the attack is legal (not already hit)
    if (this.gameboard.receiveAttack(row, col)) {
      console.log(`You hit at (${row}, ${col})!`);
    } else {
      console.log(`You missed at (${row}, ${col})!`);
    }
  }
}

export { Computer, Player };
