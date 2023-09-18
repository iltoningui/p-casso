// An Undo tool interface

import { ITool } from "../ITool";
import * as p5 from "p5";



export interface IUndo extends ITool {
  // The action it can be undo or redo
  actionName: string;
}
