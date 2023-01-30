import { Renderer } from './Renderer';
import { GameMap } from './GameMap';
import { Player } from './Player';
import { Vector2 } from './Vector2';
import { toRadian } from './utils';
import { RayCasting } from './RayCasting';

export interface MainProps {
  canvas: HTMLCanvasElement;
  map: GameMap;
  fov?: number;
  fps?: number;
}

export class Main {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  renderer: Renderer;
  player: Player;
  ray_casting: RayCasting;
  map: GameMap;

  fps_interval: number;
  fps_timestamp = -1;
  frameId = -1;

  constructor(params: MainProps) {
    this.canvas = params.canvas;
    this.map = params.map;
    this.fps_interval = 1000 / (params.fps ?? 30);

    const context = this.canvas.getContext('2d');

    if (!context) {
      throw Error(`Can't create a 2d context.`);
    }

    this.context = context;

    this.renderer = new Renderer({
      context: this.context,
      main: this,
    });
    this.player = new Player({
      position: new Vector2(30, 4.5),
      angle: toRadian(0),
      map: this.map,
    });
    this.ray_casting = new RayCasting({
      origin: this.player.position,
      fov: params.fov ?? 60,
      map: this.map,
    });
  }

  tick = () => {
    this.frameId = requestAnimationFrame(this.tick);

    const now = Date.now();
    const elapsed = now - this.fps_timestamp;

    if (elapsed < this.fps_interval) {
      return;
    }

    this.fps_timestamp = now - (elapsed % this.fps_interval);

    this.player.update();
    this.ray_casting.angle = this.player.angle;

    this.renderer.draw();
  }

  start() {
    this.tick();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }
}