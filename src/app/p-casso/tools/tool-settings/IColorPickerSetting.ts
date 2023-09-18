// Represents a tool that can change colors

import { ITool } from "../ITool";

export interface IColorPickerSettings extends ITool {
  color: string;

  updateColor(color: string): void;
}



