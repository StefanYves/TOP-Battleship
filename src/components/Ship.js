class Ship {
  constructor(length) {
    this.length = length;

    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
  isSunk() {
    return this.hits === this.length;
  }
}

module.exports = Ship;
