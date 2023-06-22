import { Piece } from "./Piece";
import { Square } from "./Square";
import { Component, Move, Position } from "./contracts";
import { define } from "./decorators";

import config from "./../../config.json";

const size = 8;

@define("chess-board")
export class Board extends Component {
  public layout: Square[][];

  public constructor() {
    super();
  }

  public render(): string | HTMLElement {
    this.layout = [];

    for (let row = 0; row < size; row++) {
      this.layout[row] = [];

      for (let column = 0; column < size; column++) {
        const square = new Square();

        square.classList.add((row + column) % 2 === 0 ? "dark" : "light");
        square.row = row;
        square.column = column;

        this.layout[row].push(square);
        this.append(square);
      }
    }

    return "";
  }

  public getValidMoves(piece: Piece): Square[] {
    const positions: Square[] = [];
    const { row, column } = piece.parentElement.postion;

    this.clean();

    config.pieces
      .find((entry) => entry.type === piece.type)
      ?.moves.forEach((move) => {
        this.paint(piece, move, positions);
      });

    /**
     * Handle special cases
     */
    switch (piece.type) {
      case "pawn": {
        /**
         * On the first move we can jump 2 spaces forward
         */
        if (!piece.touched) {
          this.paint(piece, { row: 2, column: 0 }, positions);
        }
      }
    }

    return positions;
  }

  public clean(): void {
    this.layout.forEach((row) =>
      row.forEach((square) => {
        square.classList.remove("attack");
        square.classList.remove("next");
      })
    );
  }

  private paint(
    piece: Piece,
    { row, column, scope }: Move,
    painted: Square[]
  ): void {
    const direction = piece.player === "dark" ? 1 : -1;
    const postion = piece.parentElement.postion;
    const startPosition = {
      row: postion.row + row * direction,
      column: postion.column + column,
    };

    const targets: Square[] = [];

    let target: Square;

    switch (scope) {
      case "diagonal":
      case "straight":
        let index = 0;
        do {
          target = this.getTarget({
            row: postion.row + (row + index * row) * direction,
            column: postion.column + (column + index * column),
          });

          if (target) {
            targets.push(target);
          }
          index++;
        } while (target && !target.piece);
        break;
      default:
        target = this.getTarget({
          row: postion.row + row * direction,
          column: postion.column + column,
        });

        if (target) {
          targets.push(target);
        }
    }

    targets.forEach(check);

    function check(target: Square | undefined) {
      if (!target) return;

      if (target.piece) {
        if (target.piece.player === piece.player) {
          return;
        } else {
          target.classList.toggle("attack", true);
        }
      } else {
        if (scope === "attack") return;
        target.classList.toggle("next", true);
      }

      painted.push(target);
    }
  }

  public getTarget({ row, column }: Position): Square {
    try {
      return this.layout[row][column];
    } catch (e) {
      return;
    }
  }
}
