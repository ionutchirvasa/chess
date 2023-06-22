import { Component, Position } from "../contracts";
import { attribute, define } from "../decorators";
import { Piece } from "../piece";

@define("chess-board-square")
export class Square extends Component {
  public constructor() {
    super();

    this.addEventListener("dragover", (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
  }

  @attribute("row")
  public set row(value: number) {
    this.setAttribute("row", String(value));
  }

  public get row() {
    return Number(this.getAttribute("row"));
  }

  @attribute("column")
  public set column(value: number) {
    this.setAttribute("column", String(value));
  }

  public get column() {
    return Number(this.getAttribute("column"));
  }

  public get piece(): Piece {
    return this.querySelector("chess-piece");
  }

  public set piece(value: Piece) {
    this.innerHTML = "";
    this.append(value);
  }

  public get postion(): Position {
    return {
      row: this.row,
      column: this.column,
    };
  }

  public render(): string | HTMLElement {
    return "";
  }
}
