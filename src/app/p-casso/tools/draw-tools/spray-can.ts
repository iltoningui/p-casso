import * as p5 from "p5";
import { IDrawTool } from './IDrawTool';

export class SprayCan implements IDrawTool {
  id:           string;
  icon:         string;
  name:         string;
  selected:     boolean;
  color:        string;
  size:         number;
  points:       number;
  minRadius:    number;
  density:      number;

  constructor(id: string, size: number, color: string) {
    this.id = id;
    this.icon = '#paint';
    this.name = 'Spray Can';
    this.selected = false;
    this.size = size;
    this.color = color;
    this.points = 10;
    this.minRadius = 10;
    this.density = 80;
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
    if(p.mouseIsPressed) {

      // Set Stroke this.color
      p.stroke(this.color);

      const speed = p.abs(p.mouseX - p.pmouseX) + p.abs(p.mouseY - p.pmouseY)
      
      const radius = (speed + this.minRadius);
      const radiusSqr = radius^2;


      for(var i = 0; i < this.points; i++) {
        
        const lerpX = p.lerp(p.mouseX, p.pmouseX, i / this.points);
        const lerpY = p.lerp(p.mouseY, p.pmouseY, i / this.points);


        for (let j = 0; j < this.density; j++) {

          // Selects a random position inside the radius
          const randX = p.random(-radius, radius);
          const randY = p.random(-1, 1) * p.sqrt(radiusSqr - randX * randX);
          p.strokeWeight(p.random(0, 2));
    
          // draw the random point
          p.point(lerpX + randX, lerpY + randY)
        }

      }

		}
  }
}