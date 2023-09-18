// IMplements brush stroken
import * as p5 from "p5";
import { IDrawTool } from "./IDrawTool";

// Distance between strokes
// This will be use to separate the lines being draw
// When the mouse is down 3 strokes will be made one in the middle one on top/left the other in the bottom/right
// this will define the gap between them
const gap: number = 3;
const spring = 0.4;
const friction = 0.45;
const splitNum: number = 100;
let x: number = 0;
let y: number = 0;
let deltaX: number = 0;
let deltaY: number = 0;

// Generate a small random number
// from a specified number to 2
function noise(p: p5, from: number) {
  return p.random(from, 2);
}

// The brush effect consists of making multiple lines with slightly different
export class Brush implements IDrawTool {
  id:       string;
  icon:     string;
  name:     string;
  color:    string;
  size:     number;
  selected: boolean;
  v: number = 0.5;
  r: number = 0;
  deltaX: number = 0;
  deltaY: number = 0;

  constructor(id: string, size: number, color: string) {
    this.id = id;
    this.icon = '#paint-brush';
    this.name = 'Brush';
    this.size = size;
    this.color = color;
    this.selected = false;
  }

  update(size: number, color: string): void {
    this.size = size;
    this.color = color;
  }

  updateColor(color: string): void {
    this.color = color;
  }

  draw(p: p5): void {
    if(p.mouseIsPressed) {
      p.frameRate(120);

      if(x == 0 || y == 0) {
        x = p.mouseX;
        y = p.mouseY;
      }

      // Calculates the delta between the old and new mouse positions
      deltaX = ( p.mouseX - x ) * spring;
      deltaY = ( p.mouseY - y ) * spring;
      
      // Multiply the friction
      deltaX *= friction;
      deltaY *= friction;
      
      
      this.v += p.sqrt( deltaX * deltaX + deltaY * deltaY ) - this.v;
      this.v *= 0.55;
      
      let oldR = this.r;
      this.r = this.size - this.v;

      for( let i = 0; i < splitNum; ++i ) {
        let oldX = x;
        let oldY = y;

        x += (deltaX / splitNum);
        y += (deltaY / splitNum);

        oldR += ( this.r - oldR ) / splitNum;
        if(oldR < 1) { oldR = 1; }

        p.stroke(this.color);
        p.strokeWeight( oldR + gap );

        p.line(x + noise(p, 0), y + noise(p, 0),
              oldX + noise(p, 0), oldY + noise(p, 0));

        p.strokeWeight( oldR );

        p.line( x + gap * noise(p, 0.1), y + gap * noise(p, 0.1),
              oldX + gap * noise(p, 0.1), oldY + gap * noise(p, 0.1));
        p.line( x - gap * noise(p, 0.1), y - gap * noise(p, 0.1),
              oldX - gap * noise(p, 0.1), oldY - gap * noise(p, 0.1));
      }
    } else {

      // Clear the previous mouse positions and delta calculations
      x = y = deltaX = deltaY = 0;
    }
  }
}

