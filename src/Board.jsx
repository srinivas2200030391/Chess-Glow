import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { boardStyles } from "./styles";

const game = new Chess();

function Board({ style, playerWhite, playerBlack }) {
  const [position, setPosition] = useState(game.fen());
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(game.turn()); // 'w' or 'b'
  const [moves, setMoves] = useState([]);

  const getSquareColor = (i, j) => {
    const isEven = (i + j) % 2 === 0;
    return isEven ? boardStyles[style].light : boardStyles[style].dark;
  };

  const handleClick = (square) => {
    if (selected && moves.includes(square)) {
      game.move({ from: selected, to: square });
      setSelected(null);
      setMoves([]);
      setPosition(game.fen());
      setTurn(game.turn()); // Update turn 💫
    } else {
      const legalMoves = game.moves({ square, verbose: true });
      setSelected(square);
      setMoves(legalMoves.map((m) => m.to));
    }
  };

  const renderBoard = () => {
    const board = game.board();

    return board.map((row, i) => (
      <div key={i} className="flex">
        {row.map((square, j) => {
          const squareName = String.fromCharCode(97 + j) + (8 - i);
          const piece = square ? `${square.color}${square.type}` : ""; // Fixed template literal
          const isHighlight = moves.includes(squareName);

          // Get base square color
          const baseColor = getSquareColor(i, j);

          // Create a highlight color based on the theme
          const highlightColor = isHighlight
            ? boardStyles[style].highlight || `${baseColor}80` // Use theme highlight or create semi-transparent version
            : baseColor;

          return (
            <div
              key={squareName}
              onClick={() => handleClick(squareName)}
              className="w-16 h-16 flex items-center justify-center text-2xl cursor-pointer relative"
              style={{
                backgroundColor: highlightColor,
                transition: "background-color 0.2s",
              }}>
              {isHighlight && (
                <div
                  className="absolute w-8 h-8 rounded-full opacity-60"
                  style={{ backgroundColor: boardStyles[style].path }}></div>
              )}
              <span
                className={`${boardStyles[style].font} ${boardStyles[style].piece} relative z-10`}>
                {pieceIcons[piece]}
              </span>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div
          className={`px-4 py-2 rounded-2xl ${
            turn === "w"
              ? "bg-yellow-400 text-black font-extrabold shadow-lg"
              : "bg-black text-white"
          }`}>
          ♔ White: <span>{playerWhite}</span>
        </div>
        <div
          className={`px-4 py-2 rounded-2xl ${
            turn === "b"
              ? "bg-yellow-400 text-black font-extrabold shadow-lg"
              : "bg-gray-800 text-white"
          }`}>
          ♚ Black: <span>{playerBlack}</span>
        </div>
      </div>
      <div
        className="border-8 rounded-xl"
        style={{ borderColor: boardStyles[style].dark }}>
        {renderBoard()}
      </div>
    </div>
  );
}

const pieceIcons = {
  wp: "♙",
  bp: "♟",
  wr: "♖",
  br: "♜",
  wn: "♘",
  bn: "♞",
  wb: "♗",
  bb: "♝",
  wq: "♕",
  bq: "♛",
  wk: "♔",
  bk: "♚",
};

export default Board;
