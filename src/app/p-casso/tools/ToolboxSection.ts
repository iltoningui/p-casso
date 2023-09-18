// #######################################################################
//
// Represents a group of tools The Toolbox has many sections and each section has many tools
//
// #######################################################################
import { ITool } from './ITool';


export class ToolboxSection {
  id: string;
  name: string;
  tools: ITool[];

  constructor(id: string, name: string, tools: ITool[]) {
    this.id = id;
    this.name = name;
    this.tools = tools;
  }

  addTool(tool: ITool) {
    this.tools.push(tool);
  }
}
