export class Vector2 {
  y: number;
  x: number;

  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }

  get length() {
    return Math.sqrt(this.y ** 2 + this.x ** 2);
  }

  normalize() {
    const length = this.length;

    this.y /= length;
    this.x /= length;

    return this;
  }

  distance(vector: Vector2) {
    const x = this.x - vector.x;
    const y = this.y - vector.y;

    return Math.sqrt(x ** 2 + y ** 2);
  }

  floor() {
    this.y = Math.floor(this.y);
    this.x = Math.floor(this.x);
    
    return this;
  }

  copy() {
    return new Vector2(this.y, this.x);
  }

  add(vector: Vector2) {
    this.y += vector.y
    this.x += vector.x;

    return this;
  }

  subtruct(vector: Vector2) {
    this.y -= vector.y
    this.x -= vector.x; 

    return this;
  }

  multiply(vector: Vector2) {
    this.y *= vector.y;
    this.x *= vector.x;

    return this;
  }
}