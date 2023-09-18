import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from "./shared/components/toolbar/toolbar.component";
import { SketchpadComponent } from "./shared/components/sketchpad/sketchpad.component";
import { IconSpriteComponent } from './shared/icon-sprite/icon-sprite.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToolbarComponent,
        SketchpadComponent,
        IconSpriteComponent,
        ColorPickerModule
    ]
})
export class AppModule { }
