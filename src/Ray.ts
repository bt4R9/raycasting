import { Vector2 } from "./Vector2";
import { DDA } from './DDA';
import { GameMap } from "./GameMap";

export interface RayParams {
  origin: Vector2;
  angle: number;
  map: GameMap;
}

export class Ray {
  origin: Vector2;
  angle: number;
  map: GameMap;

  private dda: DDA;

  constructor(params: RayParams) {
    this.origin = params.origin;
    this.angle = params.angle;
    this.map = params.map;

    this.dda = new DDA({
      origin: this.origin,
      angle: this.angle,
      direction: new Vector2(Math.sin(this.angle), Math.cos(this.angle)),
      map: this.map,
    })
  }

  cast() {
    return this.dda.cast();
  }
}