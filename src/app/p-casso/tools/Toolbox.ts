// #######################################################################
//
//This is the tool box, its responsible for all the tool used in the canvas app
//
// #######################################################################
import { ITool } from './ITool';
import { ToolboxSection } from './ToolboxSection';

export class Toolbox {

  sections: ToolboxSection[] = [];

  // This variable will store the selected tool location
  // The first element of the array is the section index and the second is the tool index
  private _selectedTool: number[] = [0,0];

  constructor(sections: ToolboxSection[]) {
    
    this.sections = sections;
  }

  // get selectedTool() {
  //   return this.tools[this.selectedToolIdx];
  // }

  addSection(section: ToolboxSection) {
    this.sections.push(section);
  }

  selectTool(id: string) {
    
    // Finds the new tool to select
    for(let s = 0; s < this.sections.length; s++) {
      for(let t = 0; t < this.sections[s].tools.length; t++) {
        if(this.sections[s].tools[t].id == id) {

          
          // Unselects the previously selected tool
          this.sections[this._selectedTool[0]]
            .tools[this._selectedTool[1]].selected = false;

          // Selects the new tool
          this.sections[s].tools[t].selected = true;
          this._selectedTool = [s, t];
          return;
        }
      }
    }
  }

  // Return the selected tool
  get selectedTool(): ITool {
    return this.sections[this._selectedTool[0]]
      .tools[this._selectedTool[1]];
  }
}
