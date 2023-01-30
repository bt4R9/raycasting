import { Main } from "./Entry";

export interface RendererProps {
  context: CanvasRenderingContext2D;
  main: Main;
}

export class Renderer {
  context: CanvasRenderingContext2D;
  block_size: number;
  main: Main;

  constructor(params: RendererProps) {
    this.context = params.context;
    this.block_size = 6;
    this.main = params.main;
  }

  get player() {
    return this.main.player;
  }

  get ray_casting() {
    return this.main.ray_casting;
  }

  get grid() {
    return this.main.map.grid;
  }

  get offset_x() {
    return this.context.canvas.width - this.grid.length * this.block_size;
  }

  draw() {
    const { context } = this;

    context.fillStyle = '#fff';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.render_map();
    this.render_player();
    this.render_rays();
  }

  render_player() {
    const { context, player, block_size, offset_x } = this;
    const x = player.position.x * block_size;
    const y = player.position.y * block_size;
    const size = block_size * 0.25;

    context.fillStyle = '#000';
  
    context.beginPath();
    context.ellipse(offset_x + x, y, size, size, 0, 0, Math.PI * 2);
    context.fill();
  }

  render_rays() {
    const { context, player, block_size, ray_casting, offset_x } = this;
    const x = player.position.x * block_size;
    const y = player.position.y * block_size;
    const wall_width = 1;
    const height = context.canvas.height;

    let i = 0;

    for (const { intersection, angle: ray_angle, dist } of ray_casting.cast()) {
      context.strokeStyle = 'red';
      context.fillStyle = 'red';

      context.beginPath();
      context.moveTo(offset_x + x, y);
      context.lineTo(offset_x + intersection.x * block_size, intersection.y * block_size);
      context.stroke();

      context.beginPath();
      context.ellipse(offset_x + intersection.x * block_size, intersection.y * block_size, 1, 1, 0, 0, Math.PI * 2);
      context.fill();

      const eyefish_correction =  Math.cos(ray_angle - player.angle);
      const distance = eyefish_correction * dist;
      const ceiling = (height / 2) - (height  / distance);
      const floor = height - ceiling;
      const wall_index = i * wall_width;

      for (let y = 0; y < height; y += wall_width) {
        if (y < ceiling) {
          context.fillStyle = '#424242';
          context.fillRect(wall_index, y, wall_width, wall_width);
        } else if (y > ceiling && y <= floor) {
          const p = Math.floor(255 * (1 - distance / 16));
          context.fillStyle = `rgb(0, 0, ${p})`;
          context.fillRect(wall_index, y, wall_width, wall_width);
        } else {
          context.fillStyle = '#ababab';
          context.fillRect(wall_index, y, wall_width, wall_width);
        }
      }

      i += 1;
    }
  }

  render_map() {
    const { context, block_size, grid, offset_x } = this;

    context.fillStyle = '#000';

    for (let y = 0; y < grid.length; y++) {
      const dy = y * block_size;
      for (let x = 0; x < grid[y].length; x++) {
        const dx = x * block_size;

        if (grid[y][x] === 1) {
          context.fillRect(offset_x + dx, dy, block_size, block_size);
        }
      }
    }
  }
}