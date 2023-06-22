import { Component, MoveLog } from "../contracts";
import { define } from "../decorators";
import { Square } from "../square";
import { MoveListEntry } from "./MoveListEntry";

@define("move-list")
export class MoveList extends Component {
  private light: MoveLog[] = [];
  private dark: MoveLog[] = [];

  public render(): string | HTMLElement {
    return "";
  }

  public add(square: Square): void {
    const { row, column } = square.postion;

    const entry = {
      piece: square.piece,
      square: square,
    };

    const move = new MoveListEntry(square);
    
    if (entry.piece.player === "light") {
      const row = document.createElement("div");
      row.classList.add("move");
      this.root.append(row);
    }

    this.root.lastChild.appendChild(move);

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
