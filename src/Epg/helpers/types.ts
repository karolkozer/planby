// Interfaces
import { Program, Channel } from "./interfaces";

export type Position = {
  width: number;
  height: number;
  top: number;
  left: number;
  edgeEnd: number;
};

export type ProgramWithPosition = {
  position: Position;
  data: Program;
};

export type ProgramItem = {
  position: Omit<Position, "edgeEnd">;
  data: Program;
};

export type ChannelWithPosiiton = Channel & {
  position: Pick<Position, "top">;
};

export type DateTime = string | Date;
