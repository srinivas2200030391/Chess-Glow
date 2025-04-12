import { useState } from "react";
import Board from "./Board";

function App() {
  const [style, setStyle] = useState("classic");

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">
        Chess Glow 😗🎶
      </h1>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="mb-4 p-2 rounded-lg shadow bg-white text-purple-800">
        <option value="classic">Classic 💼</option>
        <option value="pastel">Pastel Dream 🌸</option>
        <option value="midnight">Midnight Glam 🌌</option>
      </select>

      <Board style={style}  playerWhite="Player 1 💎"
  playerBlack="Player 2 🕶"/>
    </div>
  );
}

export default App;
