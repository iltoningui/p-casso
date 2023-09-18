import * as p5 from 'p5';
import { ITool } from '../ITool';
import { IColorPickerSettings } from '../tool-settings/IColorPickerSetting';

// Defines the method that will allow tool to draw on the canvas


export interface IDrawTool extends ITool, IColorPickerSettings {
  color: string;
  size: number;

  // This method will allow the tool size and color to be updated
  update(size: number, color: string): void;
  // This property will draw on the canvas
  draw(p: p5): void;
}


