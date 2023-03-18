/** @format */

import { env } from "process";

import * as Chess from "chess.js";

function evaluateBoard(game: any): number {
  const board = game.board();
  let score = 0;

  for (const row of board) {
    for (const piece of row) {
      if (piece) {
        score += getPieceValue(piece);
      }
    }
  }

  return game.turn() === "w" ? score : -score;
}

function getPieceValue(piece: Chess.Piece): number {
  const pieceValues = {
    p: 10,
    r: 50,
    n: 30,
    b: 30,
    q: 100,
    k: 150,
  };

  return piece.color === "w"
    ? pieceValues[piece.type]
    : -pieceValues[piece.type];
}

function alphaBeta(
  game: any,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): number {
  if (depth === 0) {
    return evaluateBoard(game);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    const legalMoves = game.moves();

    for (const move of legalMoves) {
      game.move(move);
      const evaluation = alphaBeta(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }

    return maxEval;
  } else {
    let minEval = Infinity;
    const legalMoves = game.moves();

    for (const move of legalMoves) {
      game.move(move);
      const evaluation = alphaBeta(game, depth - 1, alpha, beta, false);
      game.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }

    return minEval;
  }
}

function bestNextMove(
  fen: string,
  depth: number,
  color: string
): string | null {
  const game = new Chess.Chess(fen);
  let bestMove: any | null = null;
  let bestValue = -Infinity;
  let maximizingPlayer = color === "white" ? true : false;
  const legalMoves = game.moves();
  let alpha = -Infinity;
  let beta = Infinity;

  for (const move of legalMoves) {
    game.move(move);
    const boardValue = alphaBeta(
      game,
      depth - 1,
      alpha,
      beta,
      maximizingPlayer
    );
    game.undo();

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }

    alpha = Math.max(alpha, boardValue);
  }

  if (bestMove) {
    game.move(bestMove);
    const lastMove = game.history({ verbose: true }).slice(-1)[0];
    game.undo();
    return lastMove ? lastMove.lan : null;
  } else {
    return null;
  }
}

export function bestNextMoveIterative(
  fen: string,
  timeLimit: number,
  color: string
): string | null {
  const startTime = Date.now();
  let depth = 8;
  let bestMove: string | null = null;

  while (Date.now() - startTime < timeLimit) {
    const currentMove = bestNextMove(fen, depth, color);
    if (currentMove !== null) {
      bestMove = currentMove;
    }

    depth++;
  }

  return bestMove;
}
