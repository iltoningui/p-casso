import * as p5 from 'p5';
import { ITool } from '../ITool';


export interface IEraseTool extends ITool {
  size: number;
  
  // This method will allow the tool size of the eraser to be modified
  update(size: number): void;
  // This property will draw on the canvas
  draw(p: p5): void;
}
