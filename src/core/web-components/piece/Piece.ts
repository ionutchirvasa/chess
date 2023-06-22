import { Component } from "../contracts";
import { attribute, define } from "../decorators";
import { Square } from "../square";
import icons from "./../../../icons.json";

@define("chess-piece")
export class Piece extends Component {
  public touched: boolean;

  public constructor(type: string, color: string) {
    super();
    this.type = type;
    this.touched = false;
    this.setAttribute("player", color);
    this.setAttribute("draggable", "true");
  }

  @attribute("player")
  get player(): string {
    return this.getAttribute("player");
  }

  public set type(value: string) {
    this.setAttribute("type", value);
    switch (value) {
      case "bishop":
        this.innerHTML = icons.bishop;
        break;
      case "king":
        this.innerHTML = icons.king;
        break;
      case "knight":
        this.innerHTML = icons.knight;
        break;
      case "pawn":
        this.innerHTML = icons.pawn;
        break;
      case "queen":
        this.innerHTML = icons.queen;
        break;
      case "rook":
        this.innerHTML = icons.rook;
        break;
    }
  }

  get type(): string {
    return this.getAttribute("type");
  }

  get icon(): SVGElement {
    return this.firstChild.cloneNode(true) as SVGElement;
  }

  public get parentElement(): Square {
    return super.parentElement as Square;
  }

  public render(): string | HTMLElement {
    return "";
  }
}
