"use strict";

console.log("Tic Tac Toe");

const gameBoard = (() => {
  let board = [];
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = undefined;
      }
    }
  };
  resetBoard();
  const isBoardFull = () => {
    return board.flat().every((cell) => cell !== undefined);
  };
  const getBoard = () => board;
  const mutateBoard = (i, j, symbol) => {
    board[i][j] = symbol;
  };
  return { getBoard, mutateBoard, resetBoard, isBoardFull };
})();

const gameControl = (() => {
  let game = true;
  const getGame = () => game;

  const winCheck = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== undefined
      ) {
        console.log("line win:", board[i][0]);
        game = false;
        return board[i][0];
      }
    }
    for (let j = 0; j < 3; j++) {
      if (
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j] &&
        board[0][j] !== undefined
      ) {
        console.log("col win:", board[0][j]);
        game = false;
        return board[0][j];
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== undefined
    ) {
      console.log("diagonal win:", board[0][0]);
      game = false;
      return board[0][0];
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== undefined
    ) {
      console.log("diagonal win:", board[0][2]);
      game = false;
      return board[0][2];
    }
    if (gameBoard.isBoardFull()) {
      console.log("draw!");
    }
    return null;
  };
  const resetGame = () => {
    gameBoard.resetBoard();
    game = true;
  };
  const switchTurns = (players) => {
    players.forEach((player) => {
      player.setTurn(!player.getTurn());
    });
  };

  return { getGame, winCheck, resetGame, switchTurns };
})();

const createPlayer = (symbol, turn) => {
  let isTurn = turn;

  const makeMove = (i, j) => {
    if (!gameBoard.getBoard()[i][j] && gameControl.getGame()) {
      gameBoard.mutateBoard(i, j, symbol);
      gameControl.winCheck();
    } else if (gameControl.getGame()) {
      console.log("cell is unavailable");
    } else {
      console.log("game is over");
    }
  };

  const getTurn = () => turn;
  const setTurn = (value) => {
    turn = value;
  };
  return { makeMove, getTurn, setTurn };
};

const x = createPlayer("x", true);
const o = createPlayer("o", false);
const players = [x, o];
const UI = (() => {
  const UIboard = document.getElementById("board");
  const UIreset = document.getElementById("reset");

  const renderTable = () => {
    UIboard.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement("div");
        cell.textContent = gameBoard.getBoard()[i][j];
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        UIboard.appendChild(cell);
      }
    }
  };

  renderTable();

  UIboard.addEventListener("click", (event) => {
    let cell = event.target;
    if (cell.classList.contains("cell")) {
      console.log("cell clicked");
      let i = parseInt(cell.dataset.row);
      let j = parseInt(cell.dataset.col);

      const activePlayer = players.filter(
        (player) => player.getTurn() === true
      );
      activePlayer[0].makeMove(i, j);
      gameControl.switchTurns(players);

      renderTable();
    }
  });

  UIreset.addEventListener("click", function () {
    console.log("reset");
    gameControl.resetGame();
    x.setTurn(true);
    o.setTurn(false);
    renderTable();
  });
})();
