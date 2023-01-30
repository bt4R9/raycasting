import { to_degree, to_radian } from './utils';
import { GameMap } from './GameMap';
import { Ray } from './Ray';
import { Vector2 } from './Vector2';

export interface RayCastingParams {
  fov: number;
  origin: Vector2;
  map: GameMap;
}

export class RayCasting {
  fov: number;
  rays: Map<number, Ray>;
  map: GameMap;
  angle = 0;

  private max_angle = 360;

  constructor(params: RayCastingParams) {
    this.fov = params.fov;
    this.map = params.map;

    this.rays = new Map();

    // 2 rays per degree
    for (let i = 0; i < this.max_angle; i += 0.25) {
      // in javascript Canvas, the direction is clockwise.
      this.rays.set(i, new Ray({
        origin: params.origin,
        angle: to_radian(i),
        map: this.map,
      }));
    }
  }

  * cast() {
    const { fov, angle, max_angle } = this;

    const start = Math.floor(to_degree(angle)) - Math.floor(fov / 2) + max_angle;
    const end = start + fov;

    for (let i = start; i <= end; i += 0.25) {
      yield this.rays.get(i % 360)!.cast();
    }
  }
}