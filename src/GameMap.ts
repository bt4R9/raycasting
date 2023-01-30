export type GridItem = 0 | 1;

export interface GameMapParams {
  grid: GridItem[][];
}

export class GameMap {
  grid: GridItem[][];

  W: number;
  H: number;

  constructor(params: GameMapParams) {
    this.grid = params.grid;

    this.H = this.grid.length;
    this.W = this.grid[0].length;
  }

  get(y: number, x: number) {
    if (y >= 0 && y < this.H && x >= 0 && x < this.W) {
      return this.grid[y][x];
    }

    return -1;
  }
}