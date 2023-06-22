import { Piece } from "../Piece";
import { Square } from "../Square";

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

export type Turn = {
  piece: Piece;
  square: Square;
};

export type HistoryEntry = {
  light: Turn;
  dark: Turn;
};
