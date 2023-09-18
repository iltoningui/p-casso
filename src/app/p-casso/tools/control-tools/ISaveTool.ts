// A Save tool interface

import { ITool } from "../ITool";
import * as p5 from "p5";



export interface ISaveTool extends ITool {
  // The tool identifier this should be unique across all tools
  format: string;
  save(p: p5, canvas: p5.Renderer, filename: string): void;
}
