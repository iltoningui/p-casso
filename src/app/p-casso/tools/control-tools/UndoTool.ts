// Undo tool object 
import { ISaveTool } from "./ISaveTool";
import * as p5 from "p5";
import { IUndo } from "./IUndo";

export class UndoTool implements IUndo {
  id: string;
  icon: string;
  name: string;
  actionName: string;
  selected: boolean;
  
  constructor(id: string, name: string, icon: string, actionName: string) {
    this.id = id;
    this.icon = icon
    this.name = name;
    this.actionName = actionName;
    this.selected = false;
  }
}