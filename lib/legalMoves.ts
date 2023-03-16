/** @format */

import Game from "chess-legal-moves";
// import { streamOfSpecificGame } from "./games";

export const getLegalMoves = (fen: string) => {
  const game: any = new Game(fen);
  const moves = game.scan;
  return moves;
};

export function getTheMoveToMake(legalMoves: any) {
  let move = "";
  while (move.length < 4) {
    const moveOptions = Math.floor(Math.random() * legalMoves.length);
    if (legalMoves[moveOptions].from.length > 0) {
      if (legalMoves[moveOptions].quietMoves.length > 0) {
        move =
          legalMoves[moveOptions].from + legalMoves[moveOptions].quietMoves[0];
      }
      if (legalMoves[moveOptions].killMoves.length > 0) {
        move =
          legalMoves[moveOptions].from + legalMoves[moveOptions].killMoves[0];
      }
    }
  }

  return move;
}
