import { Piece, Square } from "./web-components";

export class Turn {
  public current: Piece;
  public possibleMoves: Square[];

  private previous: Piece;

  public constructor() {
    this.possibleMoves = [];
  }

  public isMyTurn(piece: Piece): boolean {
    if (!this.previous && piece.player === "light") return true;

    if (this.previous && this.previous.player !== piece.player) return true;

    this.current = null;

    return false;
  }

  public next(): void {
    this.current.touched = true;
    this.previous = this.current;

    this.current = null;
    this.possibleMoves = [];
  }
}
