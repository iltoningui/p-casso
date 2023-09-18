// #######################################################################
//
// An interface for implementing a tool
//
// #######################################################################

export interface ITool {
  // The tool identifier this should be unique across all tools
  id: string;
  // The draw icon property
  icon: string;
  // The tool name
  name: string;
  // THis tool is currently selected
  selected: boolean;
}


