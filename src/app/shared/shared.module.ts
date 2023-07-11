import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components/components.const';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [COMPONENTS],
  exports: [
    BrowserModule,
    CommonModule,
    COMPONENTS,
    COMPONENTS_MATERIALS,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    COMPONENTS_MATERIALS,
  ],
})
export class SharedModule {}
