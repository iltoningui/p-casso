// An SAve tool object

import { ISaveTool } from "./ISaveTool";
import * as p5 from "p5";

export class SaveTool implements ISaveTool {
  format: string;
  id: string;
  icon: string;
  name: string;
  selected: boolean;
  
  constructor(id: string) {
    this.id = id;
    this.icon = '#floppy-disk';
    this.name = 'Save';
    this.format = 'png';
    this.selected = false;
  }

  save(p: p5, canvas: p5.Renderer, filename: string) {
    p.saveCanvas(canvas, filename, this.format);
  }
}