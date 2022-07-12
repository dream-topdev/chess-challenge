import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard";
import usePlayerStore from "../store/usePlayerStore";

function Game({ boardWidth }) {
  const {
    boardState,
    nextTurn,
    endGame
  } = usePlayerStore(state => state);
  const game = new Chess();
  game.load(boardState);

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    if (move === null) return false;
    nextTurn(game.fen());
    if (game.game_over()) {
      endGame();
    }
    return true;
  }

  return (
    <Chessboard
      boardWidth={boardWidth}
      position={game.fen()}
      onPieceDrop={onDrop}
      customBoardStyle={{
        borderRadius: '4px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
      }}
      customDarkSquareStyle={{ backgroundColor: '#779952' }}
      customLightSquareStyle={{ backgroundColor: '#edeed1' }}
    />
  );
}

export default Game;
