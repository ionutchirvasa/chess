import { Piece } from "../piece";
import { Square } from "../square";

export * from "./Component";
export * from "./CustomElement";
export * from "./StyledComponent";

export type Position = {
  row: number;
  column: number;
};

export interface Move extends Position {
  scope?: string;
}

export type MoveLog = {
  piece: Piece;
  square: Square;
};
