// This component class ir resposinble for rendering the top bar (tool bar and its events)
// It's also responsible for selecting the tools, selection the colors, saving and performing the Undo and Redo
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toolbox } from 'src/app/p-casso/tools/Toolbox';
import { ITool } from 'src/app/p-casso/tools/ITool';
import { IColorPickerSettings } from 'src/app/p-casso/tools/tool-settings/IColorPickerSetting';
import { ColorPickerModule } from 'ngx-color-picker';
import { ISaveTool } from 'src/app/p-casso/tools/control-tools/ISaveTool';
import { IUndo } from 'src/app/p-casso/tools/control-tools/IUndo';

const modalId: string = 'modal-cover';
const settingsOpenClass = 'settings-open';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, ColorPickerModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { 'class': 'flex-row align-center content-start' }
})
export class ToolbarComponent implements AfterViewInit {
  @Input() toolbox!: Toolbox;
  @Output() onUndo = new EventEmitter<string>();
  @Output() onSelectedTool = new EventEmitter<string>();
  @Output() onSelectedColor = new EventEmitter<ITool>();
  @Output() onSelectSave = new EventEmitter<ISaveTool>();
  // selectedToolId: string;
  // color: string;

  constructor(private domRef: ElementRef) {
  }


  // Wait for the view to initialize then atatch an event to a modal that will ocupy the entire screen when the color picker is visible
  // The modal background will be responsible for capturing all clicks outside de color picker to dismiss it
  ngAfterViewInit(): void {
    document.getElementById(modalId)!
    .addEventListener('click', () => this.offSettingsClick(this));
  }

  // Triggered when a tool is selected
  // if the tool is a drawing tool (marker, brush, eraser etc) its marks it as selected
  // is it's a saving tool call send the event to the sketchpadComponent to handle the saving action
  // If it's an Undo/Redo action, send the action name to the sketchpad component to handle the action
  selectTool(tool: ITool) {
    if('save' in tool) {
      this.onSelectSave.emit(tool as ISaveTool);

    } else if('actionName' in tool) {
      this.onUndo.emit((tool as IUndo).actionName);

    } else {
      this.onSelectedTool.emit(tool.id);
      this.dismissSettings();
    }


  }

  // Check if the drawing tool has color selection options
  hasOptions(tool: ITool): boolean {
    return 'draw' in tool;
  }

  // Get the selected color for the drawing toolkc
  color(tool: ITool): string | null {
    if('color' in tool) {
      return tool['color'] as  string | null;
    }
    return null;
  }

  // Event
  // Triggeed when a color is selected using the color picker
  colorPickerChange(sectionIdx: number, toolIdx: number, color: string): void {
    (this.toolbox.sections[sectionIdx].tools[toolIdx] as IColorPickerSettings).updateColor(color);
    this.toolbox.selectTool(this.toolbox.sections[sectionIdx].tools[toolIdx].id);
  }

  // Event
  // Triggered when the user open the color picker
  toggleSettings(toolId: string) {

    let prevActivated = document.querySelectorAll("." + settingsOpenClass);
    let toActivate = document.getElementById(toolId);
    let modal = document.getElementById(modalId);
    // Controls if the tool that was clicked is already active
    let selectedClassWasClicked = false;

    if(prevActivated && prevActivated.length > 0) {
      prevActivated.forEach(element => {
        
        // Check if the tool we are trying to activate is already active
        if(element.id === toolId) {
          selectedClassWasClicked = true;
        }

        element.classList.remove(settingsOpenClass);
      });
    }

    if(!selectedClassWasClicked) {
      toActivate?.classList.add(settingsOpenClass);
      modal?.classList.add(settingsOpenClass);
    }
  }

  // Event
  // Dismisses the color picker
  // Triggered when the user has the color picker options open and selects outside

  offSettingsClick(event: any) {

    // Queries for open toolbars
    let activated = document.querySelectorAll("." + settingsOpenClass);
    if(!activated || activated.length === 0) {
      return;
    }
    activated.forEach(element => {
      element.classList.remove(settingsOpenClass);
    });
  }


  // Event
  // Dismisses the color picker
  dismissSettings() {

    let activated = document.querySelectorAll("." + settingsOpenClass);

    // ends the function is no active settings menu are open
    if(activated && activated.length > 0) {
      activated.forEach(element => {
        element.classList.remove(settingsOpenClass);
      });
    }
  }

}
