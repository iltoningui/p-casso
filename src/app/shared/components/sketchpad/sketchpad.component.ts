import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as p5 from 'p5';
import { Pencil } from 'src/app/p-casso/tools/draw-tools/Pencil';
import { Eraser } from 'src/app/p-casso/tools/draw-tools/Eraser';
import { IDrawTool } from 'src/app/p-casso/tools/draw-tools/IDrawTool';
import { Toolbox } from 'src/app/p-casso/tools/Toolbox';
import { ToolboxSection } from 'src/app/p-casso/tools/ToolboxSection';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { v4 as uuidv4 } from 'uuid';
import { Crayon } from 'src/app/p-casso/tools/draw-tools/Crayon';
import { SprayCan } from 'src/app/p-casso/tools/draw-tools/spray-can';
import { Brush } from 'src/app/p-casso/tools/draw-tools/Brush';
import { SaveTool } from 'src/app/p-casso/tools/control-tools/SaveTool';
import { ISaveTool } from 'src/app/p-casso/tools/control-tools/ISaveTool';
import { UndoTool } from 'src/app/p-casso/tools/control-tools/UndoTool';
import { IUndo } from 'src/app/p-casso/tools/control-tools/IUndo';


@Component({
  selector: 'app-sketchpad',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss'],
  host: { 'class': 'flex-col align-center content-start gap20' }
})
export class SketchpadComponent implements OnInit, AfterViewInit {
  p5!: p5;

  @ViewChild('sketch')
  sketch!: ElementRef;

  constructor() {}

  ngOnInit() {}

  // Save the canvas as a PNG file
  save(tool: ISaveTool) {
    (tool as ISaveTool).save(this.p5, canvas, "export-" + Date.now().toString());

  }

  // Initializes p5js
  ngAfterViewInit() {
    this.p5 = new p5(sketch, this.sketch.nativeElement);
  }

  // Event
  // Triggered when a new tool is selected from the ToolbarComponent
  selectedTool(toolId: string) {
    toolbox.selectTool(toolId);
  }

  // Event
  // Triggered when the user selects Undo or Redo on the toolbox menu
  selectUndo(tool: string) {
    if(tool == 'undo') {
      undo(this.p5);
    } else {
      redo(this.p5);
    }
  }

  // Creates a getter for the toolbox object so it can be accessed from the template
  get toolbox(): Toolbox {
    return toolbox;
  }
}

// Creates a global toolbox variable to control the tools
let toolbox: Toolbox;
let canvas: p5.Renderer;

// This two states will save the sates of changes
// When we undo a change it will be store in the undoneStates
const states: p5.Image[] = [];
const undoneStates: p5.Image[] = [];


const sketch = (p: p5) => {
  
  p.preload = () => {};
  
  p.setup = () => {

    //
    // Create the controll section
    //
    let controlSection = new ToolboxSection(uuidv4(), "Control", []);

    // Add Save Tool
    controlSection.addTool(new SaveTool(uuidv4()));
    controlSection.addTool(new UndoTool(uuidv4(), 'Undo', '#undo', 'undo'));
    controlSection.addTool(new UndoTool(uuidv4(), 'Redo', '#refresh', 'redo'));

    //
    // Create the Drawing Section
    //
    let selectedUuid = uuidv4();
    let drawSection = new ToolboxSection(uuidv4(), "Draw", []);

    // Add drawing tools
    drawSection.addTool(new Eraser(uuidv4(), 8));
    drawSection.addTool(new Pencil(selectedUuid, 2, "#ffda00"));
    drawSection.addTool(new SprayCan(uuidv4(), 4, "#ff0000"));
    drawSection.addTool(new Crayon(uuidv4(), 4, "#ff0000"));
    drawSection.addTool(new Brush(uuidv4(), 10, "#ff0000"));
    
    toolbox = new Toolbox([controlSection, drawSection]);
    toolbox.selectTool(selectedUuid);

    canvas = p.createCanvas(p.windowWidth - 20,
      p.windowHeight  - (p.windowHeight * 0.3));
    p.background(255);
  };

  p.draw = () => {
    if(!toolbox) return;
    let canDraw = 'draw' in toolbox.selectedTool;
    if(canDraw){
      let tool = toolbox.selectedTool as IDrawTool;
      tool.draw(p);
    }
  };

  p.mousePressed = () => {
    saveState(p);
  }
}

function saveState(p: p5) {

  p.loadPixels();
  
  states.push(p.get());
}

function undo(p: p5) {
  if(!states || !states.length) {
    return;
  }
  
  let state = states.pop();
  
  undoneStates.push(state!);

  p.background(255);
  p.image(state!, 0, 0);
}

function redo(p: p5) {
  if(!undoneStates || !undoneStates.length) {
    return;
  }
  
  let state = undoneStates.pop();
  
  states.push(state!);

  p.background(255);
  p.image(state!, 0, 0);
}