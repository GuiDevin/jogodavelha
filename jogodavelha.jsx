import React, { useState } from "react";

const initialBoard = ["1","2","3","4","5","6","7","8","9"];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index] === "X" || board[index] === "O") return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const currentPlayer = isXNext ? "X" : "O";
    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (newBoard.every((c) => c === "X" || c === "O")) {
      setWinner("empate");
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const status =
    winner === "empate"
      ? "Empate!"
      : winner
      ? `Parabéns, jogador ${winner} ganhou!`
      : `Vez do jogador ${isXNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((value, idx) => (
          <button
            key={idx}
            className="square"
            onClick={() => handleClick(idx)}
          >
            {value === "X" || value === "O" ? value : ""}
          </button>
        ))}
      </div>
      <button onClick={resetGame} style={{ marginTop: "10px" }}>
        Reiniciar
      </button>
    </div>
  );
}

function checkWinner(board, player) {
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
  return lines.some(
    ([a, b, c]) => board[a] === player && board[b] === player && board[c] === player
  );
}

export default App;
