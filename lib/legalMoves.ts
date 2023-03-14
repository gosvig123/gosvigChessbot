/** @format */

import Game from "chess-legal-moves";
// import { streamOfSpecificGame } from "./games";

export const getLegalMoves = (fen: string) => {
  const game: any = new Game(fen);
  const moves = game.scan;

  return moves;
};
