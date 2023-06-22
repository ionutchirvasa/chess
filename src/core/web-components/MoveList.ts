import { Square } from "./Square";
import { Component, Turn } from "./contracts";
import { define } from "./decorators";

import config from "./../../config.json";

@define("move-list")
export class MoveList extends Component {
  private light: Turn[] = [];
  private dark: Turn[] = [];

  public render(): string | HTMLElement {
    return "";
  }

  public add(square: Square): void {
    const { row, column } = square.postion;

    const entry = {
      piece: square.piece,
      square: square,
    };

    const element = document.createElement("div");
    element.setAttribute("player", entry.piece.player);
    element.textContent = `${config.pieces.find(piece => piece.type === entry.piece.type)?.name}${config.labels.files[row]}${config.labels.ranks[column]}`;

    if (entry.piece.player === "light") {
      const row = document.createElement("div");
      row.classList.add("move");
      this.root.append(row);
    }

    this.root.lastChild.appendChild(element);

    switch (entry.piece.player) {
      case "light":
        this.light.push();
        break;
      case "dark":
        this.dark.push();
        break;
    }
  }
}
