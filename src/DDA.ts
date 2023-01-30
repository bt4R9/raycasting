import { GameMap } from "./GameMap";
import { Vector2 } from "./Vector2";

export interface DDAParams {
  origin: Vector2;
  direction: Vector2;
  angle: number;
  map: GameMap;
}

export class DDA {
  origin: Vector2;
  direction: Vector2;
  angle: number;
  delta_direction: Vector2;
  map: GameMap;

  W: number;
  H: number;

  constructor(params: DDAParams) {
    this.origin = params.origin;
    this.direction = params.direction;
    this.angle = params.angle;
    this.map = params.map;

    this.H = this.map.grid.length;
    this.W = this.map.grid[0].length;

    const direction_x = this.direction.x;
    const direction_y = this.direction.y;

    this.delta_direction = new Vector2(
      Math.sqrt(1 + (direction_x * direction_x) / (direction_y * direction_y)),
      Math.sqrt(1 + (direction_y * direction_y) / (direction_x * direction_x))
    );
  }

  // based on https://lodev.org/cgtutor/raycasting.html
  cast() {
    const { origin, direction, delta_direction, map } = this;

    const map_position = origin.copy().floor();
    const step = new Vector2(0, 0);
    const side_dist = new Vector2(0, 0);

    if (direction.x < 0) {
      step.x = -1;
      side_dist.x = (origin.x - map_position.x) * delta_direction.x;
    } else {
      step.x = 1;
      side_dist.x = (map_position.x + 1.0 - origin.x) * delta_direction.x;
    }

    if (direction.y < 0) {
      step.y = -1;
      side_dist.y = (origin.y - map_position.y) * delta_direction.y;
    } else {
      step.y = 1;
      side_dist.y = (map_position.y + 1.0 - origin.y) * delta_direction.y;
    }

    let side = false;
    let found = false;

    while (!found) {
      if (side_dist.x < side_dist.y) {
        side_dist.x += delta_direction.x;
        map_position.x += step.x;
        side = false;
      } else {
        side_dist.y += delta_direction.y;
        map_position.y += step.y;
        side = true;
      }

      if (map.get(map_position.y, map_position.x) > 0) {
        found = true;
      }
    }

    const dist = !side
      ? Math.abs((map_position.x - origin.x + (1 - step.x) / 2) / direction.x)
      : Math.abs((map_position.y - origin.y + (1 - step.y) / 2) / direction.y);

    return {
      intersection: new Vector2(origin.y + direction.y * dist, origin.x + direction.x * dist),
      origin: this.origin,
      direction: this.direction,
      angle: this.angle,
      dist,
    };
  }
}