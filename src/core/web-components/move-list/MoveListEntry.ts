import { Component } from "../contracts";
import { define } from "../decorators";
import { Piece } from "../piece";
import { Square } from "../square";

import config from "./../../../config.json";

@define("move-list-entry")
export class MoveListEntry extends Component {
  public constructor(target: Square) {
    super();

    this.piece = target.piece;
    this.position = target;
  }

  public render(): string | HTMLElement {
    return /**html */ `
        <div class="piece"></div>
        <div class="position"></div>
        `;
  }

  public set piece(piece: Piece) {
    if (piece.type === "pawn") return;
    const target = this.querySelector(".piece");
    target.append(piece.icon);
    //this.setAttribute("player", piece.player);//white is always first
  }

  public set position(square: Square) {
    const { row, column } = square.postion;
    this.querySelector(
      ".position"
    ).textContent = `${config.labels.files[row]}${config.labels.ranks[column]}`;
  }
}
