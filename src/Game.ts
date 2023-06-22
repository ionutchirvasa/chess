import config from "./config.json";
import { Turn } from "./core/Turn";
import { Board, MoveList, Piece, Square } from "./core/web-components";
export class Game {
  public board: Board;

  public taken: Piece[];

  public history: MoveList;

  private turn: Turn;

  public constructor() {
    this.board = new Board();
    this.history = new MoveList();

    document.body.append(this.board);
    document.body.append(this.history);

    this.turn = new Turn();

    this.board
      .querySelectorAll("chess-board-square")
      .forEach((square) => square.addEventListener("drop", this.onDrop));
  }

  public restart(): void {
    config.initial.forEach((type, index) => {
      this.move(new Piece(type, "dark"), Math.floor(index / 8), index % 8);
    });

    config.initial.forEach((type, index) => {
      this.move(new Piece(type, "light"), 7 - Math.floor(index / 8), index % 8);
    });

    this.board.querySelectorAll("chess-piece").forEach((piece) => {
      piece.addEventListener("dragstart", this.onDragStart);
      piece.addEventListener("pointerdown", this.onPointerDown);
    });
  }

  public move(piece: Piece, x: number, y: number): void {
    const target = this.board.layout[x][y];

    target.piece = piece;
  }

  private onDragStart = (event: DragEvent) => {
    event.dataTransfer.effectAllowed = "move";

    this.turn.current = event.currentTarget as Piece;
  };

  private onPointerDown = (event: PointerEvent) => {
    const piece = event.currentTarget as Piece;

    if (this.turn.isMyTurn(piece)) {
      this.turn.possibleMoves = this.board.getValidMoves(
        event.currentTarget as Piece
      );
    } else {
      this.board.clean();
    }
  };

  private onDrop = (event: DragEvent) => {
    this.board.clean();

    const target = event.currentTarget as Square;

    if (this.turn.possibleMoves.includes(target)) {
      target.piece = this.turn.current;
      this.history.add(target);
      this.turn.next();
    }
  };
}
