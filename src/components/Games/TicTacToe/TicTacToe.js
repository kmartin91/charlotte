import React, { useState } from "react";
import "./TicTacToe.scss";

const Square = ({ onClick, value }) => (
  <button className="TicTacToe__square" onClick={onClick}>
    {value}
  </button>
);

const TicTacToe = ({ onFinish, onResetBad }) => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const checkWinner = (board) => {
    const { isWinner, isLoser, isDrawn } = calculateWinner(board);

    if (isWinner) {
      onFinish("win");
      return true;
    } else if (isLoser) {
      {
        onFinish("lose");
        return true;
      }
    } else if (isDrawn) {
      onFinish("draw");
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    onResetBad();
  };

  const handleClick = (i) => {
    const boardCopy = [...board];

    if (checkWinner(boardCopy)) return;

    boardCopy[i] = "X";
    setBoard(boardCopy);

    if (checkWinner(boardCopy)) return;
    aiTurn(boardCopy);
  };

  const randomIndex = (maxVal) => Math.floor(Math.random() * maxVal);

  const aiTurn = (boardCopy) => {
    const empty = boardCopy
      .map((el, index) => {
        if (el === null) return index;
      })
      .filter((el) => !!el);

    const randomId = randomIndex(empty.length);
    const aiId = empty[randomId];
    boardCopy[aiId] = "O";

    setBoard(boardCopy);
    if (checkWinner(boardCopy)) return;
  };

  const { isLoser: isLoserBoard, isDrawn: isDrawBoard } = calculateWinner(
    board
  );

  return (
    <div className="TicTacToe">
      <div className="TicTacToe__board">
        {board.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>

      {(isLoserBoard || isDrawBoard) && (
        <button className="TicTacToe__reset" onClick={resetGame}>
          Retenter sa chance
        </button>
      )}
    </div>
  );
};

export const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        isWinner: board[a] === "X",
        isLoser: board[a] !== "X",
        isDrawn: null,
      };
    }
  }
  const empty = board.filter((el) => el === null).length;

  console.log({ empty });
  if (empty <= 0) {
    return { isWinner: null, isLoser: null, isDrawn: true };
  }
  return { isWinner: null, isLoser: null, isDrawn: null };
};

export default TicTacToe;
