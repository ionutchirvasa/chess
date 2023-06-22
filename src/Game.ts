import config from "./config.json";
import { Board } from "./core/web-components/Board";
import { MoveList } from "./core/web-components/MoveList";
import { Piece } from "./core/web-components/Piece";
import { Square } from "./core/web-components/Square";

export class Game {
  public board: Board;

  public taken: Piece[];

  public history: MoveList;

  private turn: {
    piece: Piece;
    player: "dark" | "light";
    possibleMoves: Square[];
  };

  public constructor() {
    this.board = new Board();
    this.history = new MoveList();

    document.body.append(this.board);
    document.body.append(this.history);

    this.turn = {
      piece: null,
      player: "light",
      possibleMoves: [],
    };

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
      piece.addEventListener("dragstart", this.dragStart);
      piece.addEventListener("pointerdown", this.onPointerDown);
    });
  }

  public move(piece: Piece, x: number, y: number): void {
    const target = this.board.layout[x][y];

    target.piece = piece;
  }

  public dragStart = (event: DragEvent) => {
    event.dataTransfer.effectAllowed = "move";
    this.turn.piece = event.currentTarget as Piece;
  };

  public onPointerDown = (event: PointerEvent) => {
    this.turn.possibleMoves = this.board.getValidMoves(
      event.currentTarget as Piece
    );
  };

  public onDrop = (event: DragEvent) => {
    console.log("HIDE POSSIBLE MOVES", event.currentTarget);
    this.board.clean();

    const target = event.currentTarget as Square;
    console.log("TO", target);

    if (this.turn.possibleMoves.includes(target)) {
      target.piece = this.turn.piece;
      this.turn.piece.touched = true;
      this.history.add(target);
    }
  };

  public changePlayer() {
    this.turn.player = this.turn.player === "dark" ? "light" : "dark";
  }
}
