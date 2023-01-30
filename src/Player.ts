import { GameMap } from "./GameMap";
import { Vector2 } from "./Vector2";

export interface PlayerProps {
  position: Vector2;
  angle: number;
  map: GameMap;
}

export class Player {
  position: Vector2;
  angle: number;
  direction: Vector2;
  map: GameMap;

  private max_angle = Math.PI * 2;
  private pressed_keys = new Map<string, boolean>();
  private delta_rotation = 0.09;
  private delta_moving = 0.18;

  constructor(params: PlayerProps) {
    this.position = params.position;
    this.angle = params.angle;
    this.direction = this.calc_direction();
    this.map = params.map;

    document.addEventListener('keydown', this.on_key_down);
    document.addEventListener('keyup', this.on_key_up);
  }

  private calc_direction() {
    return new Vector2(Math.sin(this.angle), Math.cos(this.angle)).normalize();
  }

  on_key_down = (e: KeyboardEvent) => {
    this.pressed_keys.set(e.key, true);
  }

  on_key_up = (e: KeyboardEvent) => {
    this.pressed_keys.set(e.key, false);
  }

  * near_blocks() {
    const { position, map } = this;

    const x0 = Math.floor(position.x);
    const y0 = Math.floor(position.y);

    for (let y = y0 - 1; y <= y0 + 1; y++) {
      for (let x = x0 - 1; x <= x0 + 1; x++) {
        if (x === x0 && y === y0) {
          continue;
        }

        if (map.get(y, x) === 1) {
          yield { x, y };
        }
      }
    }
  }

  update() {
    const pressed_keys = this.pressed_keys;

    const arrow_left = pressed_keys.get('ArrowLeft');
    const arrow_right = pressed_keys.get('ArrowRight');
    const arrow_up = pressed_keys.get('ArrowUp');
    const arrow_down = pressed_keys.get('ArrowDown');

    if (arrow_left || arrow_right) {
      const delta = arrow_left ? -this.delta_rotation : this.delta_rotation;
      let angle = this.angle + delta;

      if (angle < 0) {
        angle = this.max_angle - 0.001;
      }

      this.angle = angle % this.max_angle;
      this.direction = this.calc_direction();
    }

    if (arrow_up || arrow_down) {
      const direction = this.direction;
      const delta = arrow_up ? this.delta_moving : -this.delta_moving;

      const new_x = this.position.x + direction.x * delta;
      const new_y = this.position.y + direction.y * delta;

      const floored_new_x = Math.floor(new_x);
      const floored_new_y = Math.floor(new_y);

      let can_move_x = true;
      let can_move_y = true;

      for (const { x, y } of this.near_blocks()) {
        if (floored_new_x === x && floored_new_y === y) {
          can_move_x = false;
          can_move_y = false;
        }
      }

      if (can_move_x)
        this.position.x += direction.x * delta;
      if (can_move_y)
        this.position.y += direction.y * delta;
    }
  }
}