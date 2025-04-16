"use strict";

console.log("Tic Tac Toe");

const gameBoard = (() => {
  let board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }

  const getBoard = () => board;
  const mutateBoard = (i, j, symbol) => {
    board[i][j] = symbol;
  };
  return { getBoard, mutateBoard };
})();

const createPlayer = (symbol) => {
  const makeMove = (i, j) => {
    if (!gameBoard.getBoard()[i][j]) {
      gameBoard.mutateBoard(i, j, symbol);
    } else {
      console.log("cell is unavailable");
    }
  };

  return { symbol, makeMove };
};
const x = createPlayer("x");
const o = createPlayer("o");

x.makeMove(1, 1);
console.log(gameBoard.getBoard());
x.makeMove(1, 2);
o.makeMove(1, 2);
