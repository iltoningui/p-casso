// Eraser Tool
// Initially was going  to implemented using the erase() noErase() features from p5js
// But these methods were deleting the background as well so the eraser was implemented using the white strokes on the screen
import * as p5 from 'p5';
import { IEraseTool } from './IEraseTool';



export class Eraser implements IEraseTool {
  // The eraser is being implemented as a drawer instead of using the erase() and noErase()
  // Because the erase is deleting the background as well, even though the documentation states that it shouldn't
  // https://p5js.org/reference/#/p5/erase
  id: string;
  icon: string;
  name: string;
  size: number;
  selected: boolean;

  constructor(id: string, size: number) {
    this.id = id;
    this.icon = '#eraser';
    this.name = 'Eraser';
    this.size = size;
    this.selected = false;
  }

  update(size: number): void {
    this.size = size;
  }

  draw(p: p5): void {
    // Check if the mouse button is pressed
    if (p.mouseIsPressed) {
      // This will cause all drawing actions to erase from canvas instead of adding
      p.stroke(255);

      // Set Stroke size
      p.strokeWeight(this.size);

      // Erase using the line
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
  }
}
