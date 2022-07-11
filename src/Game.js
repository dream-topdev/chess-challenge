import { useState, } from "react";
import './App.css';
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard";
import usePlayerStore from "./store/usePlayerStore";

function Game({ boardWidth }) {
  const {
    boardState,
    nextTurn,
    moveForward,
    moveBackward,
    startGame,
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
    return true;
  }

  return <Chessboard boardWidth={boardWidth} position={game.fen()} onPieceDrop={onDrop} />;
}

export default Game;
