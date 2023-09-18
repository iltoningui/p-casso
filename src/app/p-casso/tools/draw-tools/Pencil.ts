// Pencil Stroke implementation
import * as p5 from 'p5';
import { IDrawTool } from './IDrawTool';



export class Pencil implements IDrawTool {
  id: string;
  icon: string;
  name: string;
  color: string;
  size: number;
  selected: boolean;

  constructor(id: string, size: number, color: string) {
    this.id = id;
    this.icon = '#pencil';
    this.name = 'Pencil';
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
    // Check if the mouse button is pressed
    if (p.mouseIsPressed) {

      // Set Stroke this.color
      p.stroke(this.color as string);
      
      // Set Stroke size
      p.strokeWeight(this.size);

      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
  }
}



